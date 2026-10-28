import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart, Star } from "lucide-react";
import type { ProductDTO } from "@/utils/types";

type ProductCardProps = {
    product: ProductDTO;
};

export function ProductCard(product: ProductCardProps) {
    return (
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <AspectRatio ratio={4 / 3} className="overflow-hidden bg-muted">
                <img
                    src={product.product.image}
                    alt="Product"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* <Badge className="absolute left-3 top-3 bg-black/80 text-white backdrop-blur">
                    -20%
                </Badge> */}
            </AspectRatio>

            <CardContent className="space-y-2 p-4">
                <h3 className="line-clamp-1 font-semibold text-base">
                    {product.product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-sm">
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                    i < 4
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-muted text-muted"
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-muted-foreground">
                        {product.product.numReviews}
                    </span>
                </div>

                {/* Price + Cart */}
                <div className="flex items-center justify-between pt-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold">$149.99</span>
                        <span className="text-sm text-muted-foreground line-through">
                            $189.99
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
