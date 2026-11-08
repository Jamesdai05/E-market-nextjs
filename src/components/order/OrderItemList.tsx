import OrderItemCard from "./OrderItemCard";
import type { OrderData } from "@/utils/actions/order/orderAction"


const OrderItemList = ({ order }: { order: OrderData; }) => {
  const orderItems=order.orderItems

  return (
      <div>
          <h1 className="text-foreground text-xl font-bold mx-4">Items List</h1>
          <div className="grid col-span-12 rounded-lg border gap-4 divide-y">
              {orderItems?.map((item) => (
                  <OrderItemCard item={item} key={item.id} />
              ))}
          </div>
      </div>
  );
}
export default OrderItemList