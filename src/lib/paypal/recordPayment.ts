import "server-only";

import type { Order as PayPalOrder } from "@paypal/paypal-server-sdk";
import type { Order } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { PAYPAL_CURRENCY } from "./orders";

// paid:     money received, order marked paid
// pending:  PayPal is holding the capture (e.g. review); a webhook settles it later
// declined: the capture was refused, no money taken; the customer may pay again
// failed:   the PayPal order doesn't match ours; recorded for a manual refund
export type PayPalPaymentOutcome = "paid" | "pending" | "declined" | "failed";

// Checks a PayPal order against our order and records the result.
// Shared by the capture action and the webhook, so both apply the same rules.
export async function recordPayPalPayment(
    order: Order,
    paypalOrderId: string,
    result: PayPalOrder,
): Promise<PayPalPaymentOutcome> {
    const captures =
        result.purchaseUnits?.flatMap(
            (unit) => unit.payments?.captures ?? [],
        ) ?? [];

    const capture = captures[0];
    const captureStatus = String(capture?.status);

    // only ever touch this PayPal order's attempt, and never a paid order
    const thisAttempt = {
        id: order.id,
        paymentId: paypalOrderId,
        isPaid: false,
    };

    // A refused capture took no money, so there is no amount to check
    if (
        captures.length === 1 &&
        (captureStatus === "DECLINED" || captureStatus === "FAILED")
    ) {
        await prisma.order.updateMany({
            where: thisAttempt,
            data: {
                paymentStatus: "DECLINED",
                paymentUpdateTime: new Date(),
            },
        });
        return "declined";
    }

    const matches =
        String(result.status) === "COMPLETED" &&
        captures.length === 1 &&
        capture?.amount?.currencyCode === PAYPAL_CURRENCY &&
        capture.amount.value === order.totalPrice.toFixed(2);

    if (matches && captureStatus === "COMPLETED") {
        // isPaid: false means a second, simultaneous request changes nothing
        await prisma.order.updateMany({
            where: thisAttempt,
            data: {
                isPaid: true,
                paidAt: new Date(),
                paymentStatus: "COMPLETED",
                paymentUpdateTime: new Date(),
                // the PayPal account that paid (payer is PayPal's older field for the same thing)
                paymentEmail:
                    result.paymentSource?.paypal?.emailAddress ??
                    result.payer?.emailAddress ??
                    null,
            },
        });
        return "paid";
    }

    if (matches && captureStatus === "PENDING") {
        await prisma.order.updateMany({
            where: thisAttempt,
            data: {
                paymentStatus: "PENDING",
                paymentUpdateTime: new Date(),
            },
        });
        console.warn("PayPal capture pending", {
            orderId: order.id,
            paypalOrderId,
            reason: capture?.statusDetails?.reason,
        });
        return "pending";
    }

    // PayPal may already have taken the money, so record the failure
    // to find (and refund) this payment later instead of losing it
    await prisma.order.updateMany({
        where: { id: order.id, isPaid: false },
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
    return "failed";
}
