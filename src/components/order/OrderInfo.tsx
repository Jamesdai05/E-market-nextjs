import { CreditCard } from "lucide-react";
import { Badge } from "../ui/badge";
import { OrderData } from "@/utils/actions/order/orderAction";

const OrderInfo = ({order}:{order:OrderData}) => {
  return (
    <div className="flex flex-col col-span-12 md:col-span-6 border rounded-lg p-4">
      <div className="title flex gap-2 justify-start">
        <CreditCard className="size-5" />
        <h1>Payment</h1>
      </div>
      <div className="info flex flex-col gap-2">
        <p>{order.paymentMethod}</p>
        {order.isPaid ? (
          <Badge>
            Paid{order.paidAt && ` on ${order.paidAt.toLocaleDateString()}`}
          </Badge>
        ) : (
          <Badge variant="destructive">Not paid</Badge>
        )}
      </div>
    </div>
  )
}
export default OrderInfo