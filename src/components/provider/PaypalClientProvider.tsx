"use client";

import { ReactNode } from "react";
import { PayPalProvider } from "@paypal/react-paypal-js/sdk-v6";

const PaypalClientProvider = ({children}:{children:ReactNode}) => {

  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

  // same rule as the server client in src/lib/paypal/client.ts, so both use one environment
  const environment =
    process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === "production" ? "production" : "sandbox";

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
      environment={environment}
      components={["paypal-payments"]}
      pageType="checkout"
    >
      {children}
    </PayPalProvider>
  );
};

export default PaypalClientProvider;