import Image from "next/image";
import imgHolder from "@images/airpods.jpg"

const OrderItemCard = () => {
    return (
        <article className="flex items-center justify-between w-full p-4 border">
            {/* image */}
            <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                    src={imgHolder}
                    alt="earphone"
                    fill
                    sizes="80px"
                    className="object-cover"
                />
                {/* <div className="flex flex-col gap-2">
                    <p className="line-clamp-1 font-medium text-black">
                        Product Name
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Qty:1 X 299.00
                    </p>
                </div> */}
            </div>
            {/* Product Information */}
            <div className="min-w-0 flex-1 space-y-1">
                <p className="truncate font-medium">Product Name</p>
                <p className="text-sm text-muted-foreground">
                    Qty: 1 × $299.00
                </p>
            </div>
            <div className="shrink-0 text-right">
                <span>$299.00</span>
            </div>
        </article>
    );
};
export default OrderItemCard;
