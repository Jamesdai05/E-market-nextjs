import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Rating from "@/components/Rating/Rating";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart} from "lucide-react";
import type { ProductDTO } from "@/utils/types";
import {currencyFormatter } from "@/lib/utils"
import Link from "next/link";

type ProductCardProps = {
    product: ProductDTO;
};



export function ProductCard({ product }: ProductCardProps) {

    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <Link href={`/products/${product.id}`}>
                <AspectRatio ratio={4 / 3} className="overflow-hidden bg-muted">
                    <img
                        src={product.image}
                        alt="Product"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </AspectRatio>
            </Link>

            <CardContent className="space-y-2 p-4">
                <h3 className="line-clamp-1 font-semibold text-base">
                    {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-sm">
                    <div className="flex items-center">
                        <Rating rating={product.rating} reviews={product.numReviews} />
                    </div>
                </div>

                {/* Price + Cart */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold">
                            {currencyFormatter.format(product.price)}
                        </span>
                    </div>
                    <Button size="icon" className="h-9 w-9 rounded-full">
                        <ShoppingCart className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
