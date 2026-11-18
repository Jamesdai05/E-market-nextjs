import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getPayPalOrder } from "@/lib/paypal/orders";
import { verifyPayPalWebhook } from "@/lib/paypal/webhook";
import { recordPayPalPayment } from "@/lib/paypal/recordPayment";

type PayPalWebhookEvent = {
    event_type?: string;
    resource?: {
        supplementary_data?: {
            related_ids?: { order_id?: string };
        };
    };
};

export async function POST(req: NextRequest) {
    const rawBody = await req.text();

    // 1. Verify that the event came from PayPal
    let verified: boolean;
    try {
        verified = await verifyPayPalWebhook(req.headers, rawBody);
    } catch (e) {
        // our config or PayPal is at fault, not the event: 500 makes PayPal retry later
        console.error("Could not verify PayPal webhook", e);
        return new NextResponse("Webhook verification unavailable", {
            status: 500,
        });
    }
    if (!verified) {
        return new NextResponse("Invalid webhook signature", { status: 400 });
    }

    const event = JSON.parse(rawBody) as PayPalWebhookEvent;

    // PENDING records a held capture; COMPLETED / DENIED settle it later
    if (
        event.event_type !== "PAYMENT.CAPTURE.COMPLETED" &&
        event.event_type !== "PAYMENT.CAPTURE.PENDING" &&
        event.event_type !== "PAYMENT.CAPTURE.DENIED"
    ) {
        return NextResponse.json({ received: true });
    }

    // 2. The capture belongs to a PayPal order, which we stored as paymentId
    const paypalOrderId = event.resource?.supplementary_data?.related_ids?.order_id;
    if (!paypalOrderId) {
        return new NextResponse("Missing PayPal order ID", { status: 400 });
    }

    const order = await prisma.order.findFirst({
        where: { paymentId: paypalOrderId, paymentMethod: "paypal" },
    });

    if (!order) {
        // PayPal took money for an order we can't match: log it to refund by
        // hand. 200 because retrying won't make the order appear.
        console.error("PayPal capture for unknown order", { paypalOrderId });
        return NextResponse.json({ received: true });
    }

    if (order.isPaid) {
        return NextResponse.json({ received: true });
    }

    // 3. Don't trust the event body for amounts or status: fetch the order
    // from PayPal and check it with the same rules as the capture action.
    // (Events can arrive out of order; the current PayPal state is what counts.)
    const paypalOrder = await getPayPalOrder(paypalOrderId);
    const outcome = await recordPayPalPayment(order, paypalOrderId, paypalOrder);

    if (outcome !== "failed") {
        revalidatePath(`/orders/${order.id}`);
    }

    // a mismatch is already recorded as VERIFICATION_FAILED; retrying won't change it
    return NextResponse.json({ received: true });
}
