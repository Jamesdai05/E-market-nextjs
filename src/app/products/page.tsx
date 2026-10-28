import CarouselComp from "@/components/Carousel/CarouselComp";
import { Suspense } from "react";
import Message from "@/components/global/Message";
import ProductContent from "@/components/productContents/ProductContents";

const ProductsPage = () => {

    // if (!allProducts.length)
    //     return <Message>No products available now.</Message>;

    return (
        <div className="flex flex-col max-w-7xl mx-auto gap-10">
            <CarouselComp />
            <Suspense fallback={<Message>Loading products...</Message>}>
                <ProductContent />
            </Suspense>
        </div>
    );
};
export default ProductsPage;
