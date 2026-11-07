import OrderInfo from "@/components/order/OrderInfo"
import OrderSummaryCard from "@/components/order/OrderSummaryCard"
import { OrderData } from "@/utils/actions/order/orderAction";

const OrderDetailsCard = ({order}:{order:OrderData}) => {
  return (
    <div className="grid gap-4 grid-cols-12 w-full">
      <OrderSummaryCard order={order} />
      <OrderInfo order={order} />
    </div>
  )
}
export default OrderDetailsCard