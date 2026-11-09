import { OrderData } from "@/utils/actions/order/orderAction";
import PayPalButton from "@/components/paypal/PaypalButton";
import PaypalClientProvider from "../provider/PaypalClientProvider";
import { StripeCheckoutButton } from "../stripe/StripeCheckoutButton";

const PaymentSummary = ({ order }: { order: OrderData }) => {
    const { itemsPrice, taxPrice, totalPrice, shippingPrice } = order;

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
                    {!order.isPaid && order.paymentMethod === "paypal" && (
                        <PaypalClientProvider>
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
