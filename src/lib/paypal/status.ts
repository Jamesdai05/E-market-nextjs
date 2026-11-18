// Order.paymentStatus values for which PayPal may hold (or be about to take)
// money for the order, so no new PayPal payment may be started for it.
// Shared by createPaypalOrder (server) and PaymentSummary (UI).
export const PAYPAL_PAYMENT_LOCKED_STATUSES = [
    "VERIFICATION_FAILED",
    "PENDING",
] as const;

export function isPayPalPaymentLocked(paymentStatus: string | null): boolean {
    return (PAYPAL_PAYMENT_LOCKED_STATUSES as readonly string[]).includes(
        paymentStatus ?? "",
    );
}
