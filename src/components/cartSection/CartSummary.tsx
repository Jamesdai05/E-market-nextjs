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
    console.log(result);

    const cart = result.cart;
    const subTotal = (cart?.subTotal ?? 0).toFixed(2);
    // const isEmpty = !cart || cart.items.length === 0;

    // if(isEmpty) return <Message type="info">Your cart is empty, please add</Message>
    return (
        <Card className="md:sticky md:top-20">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Items</span>
                    <span className="text-lg">{cart?.itemCount ?? 0}</span>
                </div>
                <div className="flex jsutify-between items-center text-base font-semibold">
                    <span>SubTotal:</span>
                    <span>{subTotal}</span>
                </div>
            </CardContent>
            <CardFooter>
                {(cart?.itemCount ?? 0) > 0 ? (
                    <Button
                        render={<Link href={"/shipping"} />}
                        nativeButton={false}
                        className="link-btn"
                    >
                        Proceed to Checkout
                    </Button>
                ) : (
                    <Button disabled className="link-btn">
                        Proceed to Checkout
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default CartSummary;
