import type { OrderDetailsPageProps } from "@/app/orders/[slug]/page"
import OrderDetailsCard from "./OrderDetailsCard";
import OrderInfo from "./OrderInfo";
import OrderItemList from "./OrderItemList";
import OrderPageHeader from "./OrderPageHeader";



const OrderContent = async ({ params }:OrderDetailsPageProps) => {
  return (
    <>
      <OrderPageHeader params={params} />
      <OrderDetailsCard />
      <OrderItemList/>
    </>
  )
}
export default OrderContent