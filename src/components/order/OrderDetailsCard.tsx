import OrderInfo from "@/components/order/OrderInfo";
import OrderShippingCard from "@/components/order/OrderShippingCard";
import { OrderData } from "@/utils/actions/order/orderAction";
import { Badge } from "@/components/ui/badge";

type OrderDetailsCardProps = {
  slug: string;
  order: OrderData;
}

const OrderDetailsCard = ({order,slug}: OrderDetailsCardProps) => {
    return (
        <>
            <div className="flex justify-between items-center border rounded-lg p-4">
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">Order Details</h1>
                    <p className="text-muted-foreground">Order #{slug}</p>
                </div>
                {order.isDelivered ? (
                    <Badge>Delivered</Badge>
                ) : order.isPaid ? (
                    <Badge variant="secondary">Processing</Badge>
                ) : (
                    <Badge variant="destructive">Awaiting payment</Badge>
                )}
            </div>
            <div className="grid gap-4 grid-cols-12 w-full">
                <OrderShippingCard order={order} />
                <OrderInfo order={order} />
            </div>
        </>
    );
};
export default OrderDetailsCard;
