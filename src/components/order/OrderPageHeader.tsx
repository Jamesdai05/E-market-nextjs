import { Badge } from "@/components/ui/badge";
import type { OrderDetailsPageProps } from "@/app/orders/[slug]/page";


const OrderPageHeader = async ({ params }: OrderDetailsPageProps) => {
    const { slug } = await params;
  return (
      <div className="flex justify-between items-center border rounded-lg p-4">
          <div className="flex flex-col">
              <h1 className="text-lg font-semibold">Order Details</h1>
              <p className="text-muted-foreground">Order #{slug}</p>
          </div>
          <Badge variant="destructive">Processing</Badge>
      </div>
  );
}
export default OrderPageHeader