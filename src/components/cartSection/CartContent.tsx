import CartSection from "./CartSection";
import CartSummary from "./CartSummary";
import SectionTitle from "../sectionTitle/SectionTitle";
import Cart from "../nav/Cart";
import { getUserCart } from "@/utils/actions/carts";
import { getCurrentUser } from "@/lib/session";
import Message from "../global/Message";

const CartContent = async () => {
    await getCurrentUser();
    const result = await getUserCart();
    const cart = result.cart!;

    if (cart.items.length === 0) return <Message>Your cart is empty.</Message>;

    return (
        <>
            {/* CartSection */}
            <div className="md:col-span-8 lg:col-span-9">
                <SectionTitle text="shopping cart" />
                <CartSection items={cart.items} />
            </div>
            <div className="md:col-span-4 lg:col-span-3">
                <CartSummary />
            </div>
        </>
    );
};
export default CartContent;
