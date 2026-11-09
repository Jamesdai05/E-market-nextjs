import { Suspense } from "react";
import ProductDetailsContent from "@/components/ProductDetailsContent";
import Link from "next/link";

type ProductDetailsPageProps = {
    params: Promise<{ id: string }>;
};

const ProductDetailsPage = ({ params }: ProductDetailsPageProps) => {
    return (
        <div className="container mx-auto">
            <div className="back-btn max-w-7xl mx-auto px-8 mt-4">
                <Link href="/products" className="link-btn">
                    Back
                </Link>
            </div>
            <div className="flex flex-col max-w-7xl justify-center items-center mx-auto">
                <Suspense fallback={<p>Loading...</p>}>
                    <ProductDetailsContent params={params} />
                </Suspense>
                <div className="review">
                    <h2 className="text-left">Reviews put here</h2>
                </div>
            </div>
        </div>
    );
};
export default ProductDetailsPage;
