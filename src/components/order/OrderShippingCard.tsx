import { Truck } from "lucide-react";
import { Badge } from "../ui/badge";
import { OrderData } from "@/utils/actions/order/orderAction";

const OrderShippingCard = ({ order }: { order: OrderData }) => {
  const { isDelivered } = order;
    return (
        <div className="flex flex-col col-span-12 md:col-span-6 border rounded-lg p-4">
            <div className="flex gap-2 items-center">
                <Truck className="size-5" />
                <h2 className="text-lg">Shipping</h2>
            </div>
            <div className="flex flex-col">
                <p>
                    <span className="text-muted-foreground">Name:</span>{" "}
                    {order.shippingName}
                </p>
                <p>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {order.user.email}
                </p>
                {order.phone && (
                    <p>
                        <span className="text-muted-foreground">Phone:</span>{" "}
                        {order.phone}
                    </p>
                )}
                <div>
                    <span className="text-muted-foreground">
                        Shipping address:
                    </span>
                    <p className="italic">
                        {order.address}, {order.city}, {order.country}{" "}
                        {order.postalCode}
                    </p>
                </div>
                {isDelivered ? (
                    <Badge className="text-green-300 bg-green-100">
                        Delivered
                    </Badge>
                ) : (
                    <Badge variant="destructive">Not Delivered</Badge>
                )}
            </div>
        </div>
    );
};
export default OrderShippingCard;
