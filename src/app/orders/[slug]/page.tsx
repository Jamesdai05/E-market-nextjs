import OrderDetailsCard from "@/components/order/OrderDetailsCard";
import { Badge } from "@/components/ui/badge";
import OrderItemList from "@/components/order/OrderItemList";
import { Suspense } from "react";
import Loader from "@/components/global/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import OrderPageHeader from "@/components/order/OrderPageHeader";
import OrderContent from "@/components/order/OrderContent";



export type OrderDetailsPageProps = {
    params: Promise<{ slug: string }>;
};

const OrderDetailPage = async ({ params }: OrderDetailsPageProps) => {
    // const { slug } = await params;

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6 items-between justify-center px-8 py-4">
            <Suspense fallback={<OrderDetailsSkeleton />}>
          <OrderContent params={params} />
            </Suspense>

            {/* <OrderDetailsCard />
            <OrderItemList /> */}
        </div>
    );
};


function OrderDetailsSkeleton() {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-80 lg:col-span-2" />
            <Skeleton className="h-64" />
        </div>
    );
}


export default OrderDetailPage;
