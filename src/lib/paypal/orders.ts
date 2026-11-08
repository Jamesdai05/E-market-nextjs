import "server-only";

import {
    OrdersController,
    CheckoutPaymentIntent,
} from "@paypal/paypal-server-sdk";
import { paypalClient } from "./client";

const ordersController = new OrdersController(paypalClient);

// the one currency used to create PayPal orders and to verify their captures
export const PAYPAL_CURRENCY = "SGD";

export async function createPayPalOrder(amount: string): Promise<string> {
    const { result } = await ordersController.createOrder({
        body: {
            intent: CheckoutPaymentIntent.Capture,
            purchaseUnits: [
                {
                    amount: {
                        currencyCode: PAYPAL_CURRENCY,
                        value: amount,
                    },
                },
            ],
        },
    });

    if (!result.id) {
        throw new Error("PayPal order creation failed: missing order ID");
    }

    return result.id;
}

export async function capturePayPalOrder(orderId: string) {
    const { result } = await ordersController.captureOrder({ id: orderId });
    return result;
}
