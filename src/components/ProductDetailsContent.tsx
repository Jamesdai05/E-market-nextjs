import { fetchSingleProduct } from "@/utils/actions/productActions";
import { Separator } from "@/components/ui/separator";
import ProductPurchase from "./ProductPurchaseCard/ProductPurchase";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { currencyFormatter } from "@/lib/utils";
import Rating from "./Rating/Rating";
// import

const ProductDetailsContent = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    // console.log("Fetching product:", id);

    const product = await fetchSingleProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="items-center p-6 grid grid-cols-12 gap-8 min-h-[50dvh] mt-8">
            {/* image */}
            <div className="col-span-12 md:col-span-5">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={1086}
                    height={1448}
                    priority
                    className="w-full h-auto"
                />
            </div>
            {/* Info */}
            <div className="col-span-12 flex flex-col gap-4 md:col-span-4">
                <h1 className="text-balance text-3xl font-semibold tracking-tight">
                    {product.name}
                </h1>
                <Separator />
                <Rating rating={product.rating} reviews={product.numReviews} />
                <Separator />
                <p className="text-2xl font-semibold">
                    {currencyFormatter.format(product.price)}
                </p>
                <Separator />
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-medium">Description</h2>
                    <p className="text-pretty leading-relaxed text-muted-foreground">
                        {product.description}
                    </p>
                </div>
            </div>
            {/* Bills */}
            <div className="col-span-12 md:col-span-3">
                <ProductPurchase
                    productId={product.id}
                    price={product.price}
                    countInStock={product.countInStock}
                />
            </div>
            {/* </div> */}
        </div>
        //   <div>Product details Content + {product.id}</div>
    );
};
export default ProductDetailsContent;
