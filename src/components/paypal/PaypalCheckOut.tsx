"use client";

import {
    PayPalProvider,
    PayPalOneTimePaymentButton,
} from "@paypal/react-paypal-js/sdk-v6";

const PayPalCheckout = () => {
    return (
        <PayPalProvider
            clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!}
            environment="sandbox"
            pageType="checkout"
        >
            <PayPalOneTimePaymentButton
                createOrder={async () => {
                    // Call your Server Action to create
                    // a PayPal order and return its ID.
                    throw new Error("Create order not implemented");
                }}
                onApprove={async () => {
                    // Call your Server Action to capture payment.
                    throw new Error("Capture order not implemented");
                }}
            />
        </PayPalProvider>
    );
};

export default PayPalCheckout;