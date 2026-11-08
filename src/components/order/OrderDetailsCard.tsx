import OrderInfo from "@/components/order/OrderInfo";
import OrderShippingCard from "@/components/order/OrderShippingCard";
import { OrderData } from "@/utils/actions/order/orderAction";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

type OrderDetailsCardProps = {
  slug: string;
  order: OrderData;
}

const OrderDetailsCard = async ({order,slug}: OrderDetailsCardProps) => {
    // const { slug } = await params;
    // const order = await getOrderById(slug);

    if (!order) notFound();

    return (
        <>
            <div className="flex justify-between items-center border rounded-lg p-4">
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">Order Details</h1>
                    <p className="text-muted-foreground">Order #{slug}</p>
                </div>
                <Badge variant="destructive">Processing</Badge>
            </div>
            <div className="grid gap-4 grid-cols-12 w-full">
                <OrderShippingCard order={order} />
                <OrderInfo order={order} />
            </div>
        </>
    );
};
export default OrderDetailsCard;
