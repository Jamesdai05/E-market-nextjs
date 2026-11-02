import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserCart } from "@/utils/actions/carts";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

const CartSummary = async () => {
    const result = await getUserCart();

    const cart = result.cart;
    const subTotal = (cart?.subTotal ?? 0).toFixed(2);
    // const isEmpty = !cart || cart.items.length === 0;

    // if(isEmpty) return <Message type="info">Your cart is empty, please add</Message>
    return (
        <Card className="md:sticky md:top-20">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Items</span>
                    <span className="text-lg">{cart?.itemCount ?? 0}</span>
                </div>
                <div className="flex justify-between items-center text-base font-semibold">
                    <span className="text-muted-foreground font-bold">SubTotal:</span>
                    <p className="text-lg">{subTotal}</p>
                </div>
            </CardContent>
            <CardFooter>
                {(cart?.itemCount ?? 0) > 0 ? (
                    <Button
                        render={<Link href={"/shipping"} />}
                        nativeButton={false}
                        variant="linkBtn"
                    >
                        Proceed to Checkout
                    </Button>
                ) : (
                    <Button disabled variant="linkBtn">
                        Proceed to Checkout
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default CartSummary;
