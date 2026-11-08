"use client";

import {
    PayPalOneTimePaymentButton,
    usePayPal,
    INSTANCE_LOADING_STATE,
} from "@paypal/react-paypal-js/sdk-v6";

type PayPalButtonProps = {
    orderId: string;
};

const PayPalButton = ({ orderId }: PayPalButtonProps) => {
    const { loadingStatus, error } = usePayPal();

    // SDK is still initializing
    if (loadingStatus === INSTANCE_LOADING_STATE.PENDING) {
        return <p>Loading PayPal...</p>;
    }

    // SDK failed to initialize
    if (loadingStatus === INSTANCE_LOADING_STATE.REJECTED) {
        return (
            <p className="text-sm text-destructive">
                Failed to load PayPal: {error?.message}
            </p>
        );
    }

    // SDK has not yet reached a ready state
    if (loadingStatus !== INSTANCE_LOADING_STATE.RESOLVED) {
        return null;
    }

    return (
        <PayPalOneTimePaymentButton
            createOrder={async () => {
                // Call your server action to create
                // a PayPal payment for this Prisma order.

                // Return the PayPal-generated order ID:
                // return { orderId: paypalOrderId };

                throw new Error("PayPal order creation not implemented");
            }}
            onApprove={async ({ orderId: paypalOrderId }) => {
                // Call your server action to capture payment.
                // Verify the capture succeeded before
                // updating your Prisma order.

                console.log("PayPal order:", paypalOrderId);
            }}
        />
    );
};

export default PayPalButton;
