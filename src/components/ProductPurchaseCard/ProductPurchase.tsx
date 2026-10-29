"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { currencyFormatter } from "@/lib/utils";

type ProductPruchaseProps = {
    price: number;
    countInStock: number;
    onAddToCart?: (qty: number) => void;
};

const ProductPurchase = ({
    price,
    countInStock,
    onAddToCart,
}: ProductPruchaseProps) => {
    const [qty, setQty] = useState(1);
    const [isPending, setIspending] = useState(false);
    const maximumQty = 10;
    const inStock = countInStock > 0;
    const options = Array.from(
        { length: Math.min(countInStock, maximumQty) },
        (_, i) => i + 1,
    ); // create a new array which from 1 to the maxi qty

    return (
        <div className="flex flex-col justify-center items-center">
            <Card className="w-full">
                <CardContent className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Price:</p>
                        <p className="text-xl font-semibold">{currencyFormatter.format(price)}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Status:</p>
                        <strong className="text-xl font-semibold">
                            {inStock ? "In stock" : "Out of stock"}
                        </strong>
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
                                    value && setQty(Number(qty))
                                }
                            >
                                <SelectTrigger className="w-full max-w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        {inStock &&
                                            options.map((q) => (
                                                <SelectItem
                                                    key={q}
                                                    value={String(q)}
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
                                // onClick={handleAddToCart}
                            >
                                <ShoppingCart className="h-12 w-12" />Add To Cart
                            </Button>
                        </div>
                    </div>
                </CardContent>
          </Card>
      </div>
    );
};
export default ProductPurchase;
