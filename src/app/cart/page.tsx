import SectionTitle from "@/components/sectionTitle/SectionTitle";
import CartSection from "@/components/cartSection/CartSection";
import { Suspense } from "react";
import Loader from "@/components/global/Loader";
import CartContent from "@/components/cartSection/CartContent";

const CartPage = () => {
    return (
        <div className="container max-w-7xl mx-auto flex items-center justify-center border-2 border-amber-300 px-4 py-6">
            <div className="grid w-full md:grid-cols-12 gap-6 px-6">
                {/* <div className="shopping-items md:col-span-8 lg:col-span-9">
                    <SectionTitle text="shopping cart" />
                    <Suspense fallback={<Loader />}>
                        <CartSection />
                    </Suspense>
                </div>
                <div className="bill-details md:col-span-4 lg:col-span-3">
                    <Suspense fallback={<Loader />}>
                        <div>Here will be summary of the cart</div>
                    </Suspense>
                </div> */}
                <Suspense fallback={<Loader />}>
                    <CartContent />
                </Suspense>
            </div>
        </div>  
    );
};
export default CartPage;
