"use client";

import {
    PayPalOneTimePaymentButton,
    usePayPal,
    INSTANCE_LOADING_STATE,
} from "@paypal/react-paypal-js/sdk-v6";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { captureOrder, createPaypalOrder } from "@/utils/actions/paypal/actions"


type PayPalButtonProps = {
    orderId: string;
};

const PayPalButton = ({ orderId }: PayPalButtonProps) => {
    const { loadingStatus, error } = usePayPal();
    const router = useRouter();

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
                try {
                    const order = await createPaypalOrder(orderId);
                    return { orderId: order.id };
                } catch (e) {
                    console.error("Could not start PayPal payment", e);
                    toast.error("Could not start the PayPal payment. Please try again.");
                    throw e; // stops the PayPal flow
                }
            }}
            onApprove={async (data) => {
                try {
                    const { status } = await captureOrder(orderId, data.orderId);
                    // the action revalidates the page, so the badges update by themselves
                    if (status === "paid") {
                        toast.success("Payment successful. Thank you for your order!");
                    } else if (status === "pending") {
                        toast.info(
                            "PayPal is still processing your payment. We'll update your order once it's confirmed.",
                        );
                    } else {
                        toast.error(
                            "PayPal declined the payment. Please try again or use another payment method.",
                        );
                    }
                } catch (e) {
                    console.error("PayPal capture failed", e);
                    toast.error(
                        "We couldn't confirm your payment. If you were charged, please contact us.",
                    );
                    // the action threw before revalidating, so reload the order
                    // to show its new state (e.g. "under review" in place of this button)
                    router.refresh();
                }
            }}
            onCancel={() => {
                toast.info("Payment cancelled. You can try again any time.");
            }}
            onError={(error) => {
                console.error("PayPal error", error);
                toast.error("Something went wrong with PayPal. Please try again.");
            }}
        />
    );
};

export default PayPalButton;
