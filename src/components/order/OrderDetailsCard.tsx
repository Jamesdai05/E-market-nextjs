import OrderInfo from "@/components/order/OrderInfo"
import OrderSummaryCard from "@/components/order/OrderSummaryCard"

const OrderDetailsCard = () => {
  return (
    <div className="grid gap-4 grid-cols-12 w-full">
      <OrderSummaryCard />
      <OrderInfo />
    </div>
  )
}
export default OrderDetailsCard