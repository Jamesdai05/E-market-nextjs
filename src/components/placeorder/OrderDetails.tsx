import Image from "next/image";
import Link from "next/link";
import type { ShippingAddress } from "@/generated/prisma/client";
import type { PaymentInput } from "@/lib/schemas";

import type { CartItem } from "@/utils/actions/carts";

type OrderDetailsProps = {
    items: CartItem[];
    shipping: ShippingAddress;
    payment: PaymentInput;
};

const OrderDetails = ({ items, shipping, payment }: OrderDetailsProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-6 divide-y">
                <div className="space-y-2 text-sm">
                    <p className="font-medium">Shipping Address:</p>
                    <p>
                        {shipping.address},{shipping.city},{shipping.country}
                    </p>
                    <p className="font-medium">Name:</p>
                    <p>{shipping.shippingName}</p>
                    <p>
                        PaymentMethod: <span className="italic font-bold">{payment.paymentMethod}</span>
                    </p>
                </div>
            </div>
            <div className="mt-4 divide-y bg-card">
                <h2 className="text-xl font-semibold">OrderItems</h2>
                <ul className="divide-y">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center gap-4 p-4"
                        >
                            <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                                <Image
                                    src={item.product.image}
                                    alt={item.product.name}
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <Link
                                    href={`/products/${item.product.id}`}
                                    className="line-clamp-1 text-blue-400 font-medium hover:underline hover:text-blue-600"
                                >
                                    {item.product.name}
                                </Link>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {item.quantity} X $
                                {item.product.price.toFixed(2)}
                            </p>
                            <p className="w-20 text-right font-medium">
                                ${item.lineTotal.toFixed(2)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default OrderDetails;
