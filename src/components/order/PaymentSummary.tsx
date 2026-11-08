import { OrderData } from "@/utils/actions/order/orderAction";
import { roundNum } from "@/utils/priceCaculation";

const PaymentSummary = ({ order }: { order: OrderData }) => {
    const { itemsPrice, taxPrice, totalPrice, shippingPrice } = order;

    return (
        <div className="grid w-full gap-6 border rounded-lg p-4">
            <h2 className="text-lg font-bold">PaymentSummary</h2>
            <div className="col-span-12 space-y-4">
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Items:</p>
                    <p>${roundNum(itemsPrice)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Tax:</p>
                    <p>${roundNum(taxPrice)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">Shipping:</p>
                    <p>${roundNum(shippingPrice)}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="Capitalize text-xl font-bold">Total</p>
                    <p>${roundNum(totalPrice)}</p>
                </div>
            </div>
        </div>
    );
};
export default PaymentSummary;
