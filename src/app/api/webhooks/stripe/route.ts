import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";

// export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        return new NextResponse("Missing signature or secret", {
            status: 400,
        });
    }

    let event: Stripe.Event;

    // Verify that the event came from Stripe
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch {
        return new NextResponse("Invalid webhook signature", {
            status: 400,
        });
    }

    if (
        event.type === "checkout.session.completed" ||
        event.type === "checkout.session.async_payment_succeeded"
    ) {
        const checkout = event.data.object;

        // Delayed payment methods might not be paid yet
        if (checkout.payment_status !== "paid") {
            return NextResponse.json({ received: true });
        }

        const prismaOrderId = checkout.metadata?.orderId;

        if (!prismaOrderId) {
            return new NextResponse("Missing order ID", {
                status: 400,
            });
        }

        const order = await prisma.order.findUnique({
            where: { id: prismaOrderId },
        });

        if (!order) {
            return new NextResponse("Order not found", {
                status: 404,
            });
        }

        // Verify the exact Checkout Session and amount
        const expectedAmount = order.totalPrice.mul(100).toNumber();

        if (
            order.stripeCheckoutSessionId !== checkout.id ||
            checkout.currency !== "sgd" ||
            checkout.amount_total !== expectedAmount
        ) {
            return new NextResponse("Order and Stripe payment mismatch", {
                status: 400,
            });
        }

        const paymentIntentId =
            typeof checkout.payment_intent === "string"
                ? checkout.payment_intent
                : (checkout.payment_intent?.id ?? null);

        // Update only unpaid orders (idempotent)
        await prisma.order.updateMany({
            where: {
                id: order.id,
                stripeCheckoutSessionId: checkout.id,
                isPaid: false,
            },
            data: {
                isPaid: true,
                paidAt: new Date(),
                paymentStatus: "COMPLETED",
                paymentUpdateTime: new Date(),
                stripePaymentIntentId: paymentIntentId,
            },
        });
    }

    return NextResponse.json({ received: true });
}
