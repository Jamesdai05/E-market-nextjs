"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { currencyFormatter } from "@/lib/utils";
import { addToCart } from "@/utils/actions/cartActions";
import { useRouter } from "next/navigation";

type ProductPurchaseProps = {
    productId: string;
    price: number;
    countInStock: number;
};

const ProductPurchase = ({
    productId,
    price,
    countInStock,
}: ProductPurchaseProps) => {
    const [qty, setQty] = useState(1);
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const maximumQty = 10;
    const inStock = countInStock > 0;
    const options = Array.from(
        { length: Math.min(countInStock, maximumQty) },
        (_, i) => i + 1,
    ); // create a new array which from 1 to the maxi qty

    // calls the server action; isPending stays true until the server responds
    const handleAddToCart = () => {
        startTransition(async () => {
            const result = await addToCart(productId, qty);
            if (result.success) {
                toast.success(result.message);
                router.replace("/cart");
                router.refresh();
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <Card className="w-full">
                <CardContent className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Price:</p>
                        <p className="text-xl font-semibold">
                            {currencyFormatter.format(price)}
                        </p>
                    </div>
                    <Separator />
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">
                                Status:
                            </p>
                            <strong className="text-xl font-semibold">
                                {inStock ? "In stock" : "Out of stock"}
                            </strong>
                        </div>
                        <p className="text-lime-500 font-bold">
                            {countInStock === 1 && "Only left 1"}
                        </p>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <Label
                                htmlFor="qty"
                                className="text-sm font-normal text-muted-foreground"
                            >
                                Qty:
                            </Label>
                            <Select
                                value={String(qty)}
                                onValueChange={(value) =>
                                    value && setQty(Number(value))
                                }
                                disabled={!inStock}
                            >
                                <SelectTrigger id="qty" className="w-24">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="w-24 min-w-24">
                                    <SelectGroup className="w-24">
                                        {options.map((q) => (
                                            <SelectItem
                                                key={q}
                                                value={String(q)}
                                                className="w-24"
                                            >
                                                {q}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        <div className="cart">
                            <Button
                                className="w-full bg-nav text-nav-foreground hover:bg-nav-accent"
                                disabled={!inStock || isPending}
                                onClick={handleAddToCart}
                            >
                                {isPending ? (
                                    <Spinner />
                                ) : (
                                    <ShoppingCart className="size-4" />
                                )}
                                {isPending ? "Adding..." : "Add To Cart"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
export default ProductPurchase;
