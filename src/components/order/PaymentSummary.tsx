import { OrderData } from "@/utils/actions/order/orderAction";
import PayPalButton from "@/components/paypal/PaypalButton";
import PaypalClientProvider from "../provider/PaypalClientProvider";
import { StripeCheckoutButton } from "../stripe/StripeCheckoutButton";
import { isPayPalPaymentLocked } from "@/lib/paypal/status";

const PaymentSummary = ({ order }: { order: OrderData }) => {
    const { itemsPrice, taxPrice, totalPrice, shippingPrice } = order;
    // same check as createPaypalOrder, which refuses these orders
    const paypalLocked = isPayPalPaymentLocked(order.paymentStatus);

    return (
        <div className="grid w-full gap-6 border rounded-lg p-4">
            <h2 className="text-lg font-bold">Payment Summary</h2>
            <div className="col-span-12 space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Items:</p>
                    <p>${itemsPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Tax:</p>
                    <p>${taxPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Shipping:</p>
                    <p>${shippingPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-xl font-bold">Total</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex w-full">
                    {/* PayPal may hold money for this order, so don't start another payment */}
                    {!order.isPaid && order.paymentMethod === "paypal" && paypalLocked && (
                        order.paymentStatus === "PENDING" ? (
                            <p className="text-sm text-muted-foreground">
                                PayPal is still processing your payment. This
                                page will show it as paid once PayPal confirms it.
                            </p>
                        ) : (
                            <p className="text-sm text-destructive">
                                Your payment is under review. Please contact us
                                before trying to pay again.
                            </p>
                        )
                    )}
                    {!order.isPaid && order.paymentMethod === "paypal" && !paypalLocked && (
                        <PaypalClientProvider
                            clientId={process.env.PAYPAL_CLIENT_ID}
                        >
                            <PayPalButton orderId={order.id} />
                        </PaypalClientProvider>
                    )}
                    {!order.isPaid && order.paymentMethod === "stripe" && (
                        <StripeCheckoutButton orderId={order.id} />
                    )}
                </div>
            </div>
        </div>
    );
};
export default PaymentSummary;
