import Image from "next/image";
import type { OrderData } from "@/utils/actions/order/orderAction";

type OrderItem = OrderData["orderItems"][number];

type OrderItemCardProps = {
    item: OrderItem;
};

const OrderItemCard = ({ item }: OrderItemCardProps) => {
    return (
        <article className="flex items-center justify-between w-full gap-4 p-4 rounded-lg py-2">
            {/* image */}
            <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                />
            </div>
            {/* Product Information */}
            <div className="min-w-0 flex-1 space-x-1">
                <p className="font-medium max-w-[20ch] wrap-break-word">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} X ${item.price.toFixed(2)}
                </p>
            </div>
            <div className="shrink-0 text-right">
                <span>${item.lineTotal.toFixed(2)}</span>
            </div>
        </article>
    );
};
export default OrderItemCard;
