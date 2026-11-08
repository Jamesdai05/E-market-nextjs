"use client";

import { ReactNode } from "react";
import { PayPalProvider } from "@paypal/react-paypal-js/sdk-v6";

const PaypalClientProvider = ({children}:{children:ReactNode}) => {

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

  if (!clientId) {
    return (
        <p className="text-sm text-destructive">
            PayPal client ID is not configured.
        </p>
    );
  };

  return(
    <PayPalProvider
      clientId={clientId}
      environment="sandbox"
      components={["paypal-payments"]}
      pageType="checkout"
    >
      {children}
    </PayPalProvider>
  );
};

export default PaypalClientProvider;