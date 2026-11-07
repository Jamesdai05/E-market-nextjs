import OrderItemCard from "./OrderItemCard";

const OrderItemList = () => {
  return (
    <div className="grid col-span-12 rounded-lg border gap-4">
      <OrderItemCard />
      <OrderItemCard />
    </div>
  )
}
export default OrderItemList