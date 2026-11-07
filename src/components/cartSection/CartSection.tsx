// import { getUserCart } from "@/utils/actions/carts";
// import { ShoppingCart } from "lucide-react";
// import Message from "../global/Message";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import QuantitySelect from "./QuantitySelect";
import type { CartItem } from "@/utils/actions/cart/carts";
import RemoveButton from "./RemoveButton";

const CartSection = ({ items }: { items: CartItem[] }) => {
    // const data = await getUserCart();
    // const items = data.cart?.items ?? [];

    // if (items.length === 0)
    //     return (
    //         <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed">
    //             <ShoppingCart className="size-10 text-muted-foreground" />
    //             <Message type="info">Your cart is empty.</Message>
    //             <Button
    //                 render={<Link href="/products" />}
    //                 className="bg-nav text-nav-foreground"
    //             >
    //                 Continue shopping
    //             </Button>
    //         </div>
    //     );

    return (
        <ul className="divide-y rounded-xl border bg-card">
            {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 p-4">
                    {/* image */}
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <Link
                            href={`/products/${item.product.id}`}
                            className="line-clamp-1 font-medium hover:underline"
                        >
                            {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)} each
                        </p>
                        {item.product.countInStock === 1 && (
                            <aside className="text-sky-400 font-bold">
                                Left only 1
                            </aside>
                        )}
                    </div>
                    {/* <p className="w-16 text-center">X {item.quantity}</p> */}
                    <QuantitySelect
                        countInStock={item.product.countInStock}
                        itemId={item.id}
                        quantity={item.quantity}
                        productName={item.product.name}
                    />
                    {/* line total */}
                    <p className="w-20 text-right font-semibold">
                        ${item.lineTotal.toFixed(2)}
                    </p>
                    <RemoveButton
                        itemId={item.id}
                        productName={item.product.name}
                    />
                </li>
            ))}
        </ul>
    );
};
export default CartSection;
