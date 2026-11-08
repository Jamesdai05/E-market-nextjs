import type { OrderDetailsPageProps } from "@/app/orders/[slug]/page";
import OrderDetailsCard from "./OrderDetailsCard";
import OrderItemList from "./OrderItemList";
import { getOrderById } from "@/utils/actions/order/orderAction";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import PaymentSummary from "./PaymentSummary";

const OrderContent = async ({ params }: OrderDetailsPageProps) => {
    const { slug } = await params;

    // logged-out visitors go to login and come back here afterwards
    await getCurrentUser(`/orders/${slug}`);

    const order = await getOrderById(slug);
    if (!order) notFound();

    return (
        <>
            <OrderDetailsCard order={order} slug={slug} />
            <OrderItemList order={order} />
            <PaymentSummary order={order} />
        </>
    );
};
export default OrderContent;
