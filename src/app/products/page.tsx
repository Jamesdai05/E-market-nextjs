import CarouselComp from "@/components/Carousel/CarouselComp";
import { Suspense } from "react";
import Message from "@/components/global/Message";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import ProductContent from "@/components/product/productContents/ProductContents";

const ProductsPage = () => {

    return (
        <div className="flex flex-col max-w-7xl mx-auto gap-6">
            <div className="flex justify-center items-center w-full mb-6">
                <CarouselComp />
            </div>
            <div className="flex flex-col gap-4 p-4">
                <SectionTitle text="popular products"/>
                <Suspense fallback={<Message>Loading products...</Message>}>
                    <ProductContent />
                </Suspense>
            </div>
        </div>
    );
};
export default ProductsPage;
