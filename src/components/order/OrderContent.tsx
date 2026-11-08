import type { OrderDetailsPageProps } from "@/app/orders/[slug]/page";
import OrderDetailsCard from "./OrderDetailsCard";
import OrderItemList from "./OrderItemList";
import { getOrderById } from "@/utils/actions/order/orderAction";
import { notFound } from "next/navigation";
import PaymentSummary from "./PaymentSummary";
import PayPalCheckout from "../paypal/PaypalCheckOut";

const OrderContent = async ({ params }: OrderDetailsPageProps) => {
    const { slug } = await params;

    // console.log(slug);
    const order = await getOrderById(slug);
    // const user=await getCurrentUser()
    // console.log(order);
    if (!order) notFound();

    return (
        <>
            {/* <OrderPageHeader params={params} /> */}
            <OrderDetailsCard order={order} slug={slug} />
            <OrderItemList order={order} />
            <PaymentSummary order={order} />
        </>
    );
};
export default OrderContent;
