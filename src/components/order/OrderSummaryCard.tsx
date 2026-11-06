import { Truck } from "lucide-react";
import { Badge } from "../ui/badge";

const OrderSummaryCard = () => {
    const isDelivered = false;
    return (
        <div className="mx-auto flex flex-col md:col-span-6 border rounded-lg p-4">
            <div className="flex gap-2 items-center">
                <Truck className="size-5" />
                <h2 className="text-lg">Shipping</h2>
            </div>
            <div className="flex flex-col">
                <p>Name</p>
                <p>User.email@example.com</p>
                <p>shipping address:123 Street ABC, George City</p>
                <Badge
                    className={`${isDelivered ? "text-green-400 bg-green-200" : "text-red-500 bg-red-200"} font-medium `}
                >
                    {isDelivered ? "Delivered" : "Not Delivered"}
                </Badge>
            </div>
        </div>
    );
};
export default OrderSummaryCard;
