import { Suspense } from "react";
import Loader from "@/components/global/Loader";
import CartContent from "@/components/cartSection/CartContent";

const CartPage = () => {
    return (
        <div className="container max-w-7xl mx-auto flex items-center justify-center px-4 py-6">
            <div className="grid w-full gap-6 px-6">
                <Suspense fallback={<Loader />}>
                    <CartContent />
                </Suspense>
            </div>
        </div>
    );
};
export default CartPage;
