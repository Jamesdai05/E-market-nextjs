import type { OrderDetailsPageProps } from "@/app/orders/[slug]/page";
import OrderDetailsCard from "./OrderDetailsCard";
import OrderItemList from "./OrderItemList";
import OrderPageHeader from "./OrderPageHeader";
import { getOrderById } from "@/utils/actions/order/orderAction";
import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";

const OrderContent = async ({ params }: OrderDetailsPageProps) => {
    const { slug } = await params;

    // console.log(slug);
    const order = await getOrderById(slug);
    // const user=await getCurrentUser()
    console.log(order);
    if (!order) notFound();

    return (
        <>
            <OrderPageHeader params={params} />
            <OrderDetailsCard order={order} />
            <OrderItemList order={order} />
        </>
    );
};
export default OrderContent;
