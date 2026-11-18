"use server";

import { createPayPalOrder, capturePayPalOrder } from "@/lib/paypal/orders";
import {
    recordPayPalPayment,
    type PayPalPaymentOutcome,
} from "@/lib/paypal/recordPayment";
import {
    isPayPalPaymentLocked,
    PAYPAL_PAYMENT_LOCKED_STATUSES,
} from "@/lib/paypal/status";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createPaypalOrder(orderId: string): Promise<{ id: string }> {
    const session = await getCurrentSession();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: session.user.id,
            isPaid: false,
            paymentMethod: "paypal",
        },
    });

    if (!order) {
        throw new Error("Order is not found!");
    }

    // PayPal may hold money for this order (failed verification or pending
    // capture). Starting a new payment would overwrite paymentId, the only record of it.
    if (isPayPalPaymentLocked(order.paymentStatus)) {
        throw new Error("This order has a payment in progress. Please contact us.");
    }

    // 3. Use trusted amount from Prisma
    const amount = order.totalPrice.toFixed(2);
    if (order.totalPrice.lte(0)) {
        throw new Error("Invalid total price!");
    }

    // 4. Create the PayPal order
    const paypalOrderId = await createPayPalOrder(amount);

    //5. save the paypal orderId to the database
    // Conditions repeated here so a capture that failed (or succeeded) while
    // the PayPal order was being created isn't overwritten. paymentStatus is
    // nullable, and `notIn` alone would skip NULL rows, hence the OR.
    const { count } = await prisma.order.updateMany({
        where: {
            id: order.id,
            isPaid: false,
            OR: [
                { paymentStatus: null },
                {
                    paymentStatus: {
                        notIn: [...PAYPAL_PAYMENT_LOCKED_STATUSES],
                    },
                },
            ],
        },
        data: {
            paymentId: paypalOrderId,
            paymentStatus: "CREATED",
        },
    });

    if (count === 0) {
        throw new Error("Order can no longer be paid");
    }

    // 6. Return PayPal order ID
    return { id: paypalOrderId };
}

export async function captureOrder(
    orderId: string,
    paypalOrderId: string,
): Promise<{ status: Exclude<PayPalPaymentOutcome, "failed"> }> {
    //1. authentication
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    // 2. Find the matching order
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: session.user.id,
            paymentId: paypalOrderId,
            paymentMethod: "paypal",
        },
    });

    if (!order) {
        throw new Error("Payment order not found");
    }

    if (order.isPaid) {
        return { status: "paid" };
    }

    // 3. Capture through PayPal
    const result = await capturePayPalOrder(paypalOrderId);

    // 4. Verify the payment and record the result
    // (shared with the PayPal webhook, so both apply the same rules)
    const status = await recordPayPalPayment(order, paypalOrderId, result);
    if (status === "failed") {
        throw new Error("PayPal payment verification failed");
    }

    // 5. Refresh order page
    revalidatePath(`/orders/${orderId}`);

    return { status };
}
