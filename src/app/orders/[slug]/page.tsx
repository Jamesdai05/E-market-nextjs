import OrderDetailsCard from "@/components/order/OrderDetailsCard";
import { Badge } from "@/components/ui/badge";
import OrderItemList from "@/components/order/OrderItemList";

type OrderDetailsPageProps = {
    params: Promise<{ slug: string }>;
};

const OrderDetailPage = async ({ params }: OrderDetailsPageProps) => {
    const { slug } = await params;

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6 items-between justify-center px-8 py-4">
            <div className="flex justify-between items-center border rounded-lg p-4">
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">Order Details</h1>
                    <p className="text-muted-foreground">Order #{slug}</p>
                </div>
                <Badge variant="destructive">Processing</Badge>
            </div>
            <OrderDetailsCard />
            <OrderItemList />
        </div>
    );
};
export default OrderDetailPage;
