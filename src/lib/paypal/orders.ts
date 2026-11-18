import "server-only";

import {
    OrdersController,
    CheckoutPaymentIntent,
    CustomError,
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
    try {
        const { result } = await ordersController.captureOrder({ id: orderId });
        return result;
    } catch (e) {
        // An earlier capture may have taken the money but never reached our
        // database (timeout, crash). PayPal then rejects a second capture, so
        // fetch the order instead and let the caller verify it the same way.
        const alreadyCaptured =
            e instanceof CustomError &&
            e.statusCode === 422 &&
            e.result?.details?.some(
                (d) => d.issue === "ORDER_ALREADY_CAPTURED",
            );
        if (!alreadyCaptured) throw e;

        return getPayPalOrder(orderId);
    }
}

export async function getPayPalOrder(orderId: string) {
    const { result } = await ordersController.getOrder({ id: orderId });
    return result;
}
