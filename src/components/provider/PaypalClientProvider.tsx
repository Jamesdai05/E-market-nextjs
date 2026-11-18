"use client";

import { ReactNode } from "react";
import { PayPalProvider } from "@paypal/react-paypal-js/sdk-v6";

// clientId comes from a server component: this file runs in the browser,
// where only NEXT_PUBLIC_* env variables exist
const PaypalClientProvider = ({
  clientId,
  children,
}: {
  clientId: string | undefined;
  children: ReactNode;
}) => {

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