"use server";

import {
    createPayPalOrder,
    capturePayPalOrder,
    PAYPAL_CURRENCY,
} from "@/lib/paypal/orders";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { success } from "zod";

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

    // 3. Use trusted amount from Prisma
    const amount = order.totalPrice.toFixed(2);
    if (order.totalPrice.lte(0)) {
        throw new Error("Invalid total price!");
    }

    // 4. Create the PayPal order
    const paypalOrderId = await createPayPalOrder(amount);

    //5. save the paypal orderId to the database
    await prisma.order.update({
        where: { id: order.id },
        data: {
            paymentId: paypalOrderId,
            paymentStatus: "CREATED",
        },
    });

    // 6. Return PayPal order ID
    return { id: paypalOrderId };
}

export async function captureOrder(orderId: string, paypalOrderId: string) {
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
        return { success: true };
    }

    // 3. Capture through PayPal
    const result = await capturePayPalOrder(paypalOrderId);

    // 4. Extract capture information
    const captures =
        result.purchaseUnits?.flatMap(
            (unit) => unit.payments?.captures ?? [],
        ) ?? [];

    const capture = captures[0];

    // 5. Verify actual payment
    if (
        String(result.status) !== "COMPLETED" ||
        captures.length !== 1 ||
        String(capture?.status) !== "COMPLETED" ||
        capture?.amount?.currencyCode !== PAYPAL_CURRENCY ||
        capture.amount.value !== order.totalPrice.toFixed(2)
    ) {
        // PayPal may already have taken the money, so record the failure
        // to find (and refund) this payment later instead of losing it
        await prisma.order.update({
            where: { id: order.id },
            data: {
                paymentStatus: "VERIFICATION_FAILED",
                paymentUpdateTime: new Date(),
            },
        });
        console.error("PayPal payment verification failed", {
            orderId: order.id,
            paypalOrderId,
            status: result.status,
            capture,
        });
        throw new Error("PayPal payment verification failed");
    }

    // 6. Mark order paid in Prisma
    // (isPaid: false means a second, simultaneous capture request changes nothing)
    await prisma.order.updateMany({
        where: {
            id: order.id,
            paymentId: paypalOrderId,
            isPaid: false,
        },
        data: {
            isPaid: true,
            paidAt: new Date(),
            paymentStatus: "COMPLETED",
            paymentUpdateTime: new Date(),
        },
    });

    // 7. Refresh order page
    revalidatePath(`/orders/${orderId}`);

    return {success:true};
}
