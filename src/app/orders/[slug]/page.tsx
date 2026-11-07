import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import OrderContent from "@/components/order/OrderContent";

export type OrderDetailsPageProps = {
    params: Promise<{ slug: string }>;
};

const OrderDetailPage = async ({ params }: OrderDetailsPageProps) => {
    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6 items-between justify-center px-8 py-4">
            <Suspense fallback={<OrderDetailsSkeleton />}>
                <OrderContent params={params} />
            </Suspense>
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
