import CartSection from "./CartSection";
import CartSummary from "./CartSummary";
import SectionTitle from "../global/sectionTitle/SectionTitle";
import { getUserCart } from "@/utils/actions/cart/carts";
import { getCurrentUser } from "@/lib/session";
import Emptylist from "../Emptylist/Emptylist";

const CartContent = async () => {
    await getCurrentUser();
    const result = await getUserCart();
    const cart = result.cart!;

    // (cart.items.length === 0) return <Message>Your cart is empty.</Message>;

    return (
        <>
        {cart.items.length === 0 ? (
          <div className="col-span-12"><Emptylist heading="Your cart is empty." className="text-background bg-nav p-2 rounded-md"/></div>)

          : (
            <>
          <div className="md:col-span-8 lg:col-span-9">
                <SectionTitle text="shopping cart" />
                <CartSection items={cart.items} />
            </div>
            <div className="md:col-span-4 lg:col-span-3">
                <CartSummary />
            </div></>)}
        </>
    );
};
export default CartContent;
