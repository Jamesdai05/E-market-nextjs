"use client";

import {
    PayPalOneTimePaymentButton,
    usePayPal,
    INSTANCE_LOADING_STATE,
} from "@paypal/react-paypal-js/sdk-v6";
import { captureOrder, createPaypalOrder } from "@/utils/actions/paypal/actions"


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
                const order = await createPaypalOrder(orderId);
                return { orderId: order.id };
            }}
            onApprove={async (data) => {
                await captureOrder(orderId, data.orderId);
            }}
        />
    );
};

export default PayPalButton;
