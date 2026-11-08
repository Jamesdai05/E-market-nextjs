"use client";

import { PayPalProvider } from "@paypal/react-paypal-js/sdk-v6";
import PayPalButton from "./PaypalButton";

type PayPalCheckoutProps = {
    orderId: string;
};

const PayPalCheckout = ({ orderId }: PayPalCheckoutProps) => {
    return (
        <PayPalProvider
            clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!}
            environment="sandbox"
            components={["paypal-payments"]}
            pageType="checkout"
        >
            <PayPalButton orderId={orderId} />
        </PayPalProvider>
    );
};

export default PayPalCheckout;
