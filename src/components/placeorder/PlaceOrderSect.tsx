import OrderSummary from "./OrderSummary";
import OrderDetails from "./OrderDetails";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getUserCart } from "@/utils/actions/cart/carts";
import { cookies } from "next/headers";
import { paymentSchema } from "@/lib/schemas";

const PlaceOrderSect = async () => {
    const session = await getCurrentSession();

    if (!session)
        redirect(`/login?=redirect=${encodeURIComponent("/placeorder")}`);

    const [shippingAddress, cartData, cookieStore] = await Promise.all([
        prisma.shippingAddress.findUnique({
            where: {
                userId: session.user.id,
            },
        }),
        getUserCart(),
        cookies(),
    ]);

    const payment = paymentSchema.safeParse({
        paymentMethod: cookieStore.get("paymentMethod")?.value,
    });

    if (!shippingAddress) redirect("/shipping");
    if (!cartData.cart || cartData.cart.items.length === 0) redirect("/cart");
    if (!payment.success) redirect("/payment");

    return (
        <div className="grid w-full gap-6 md:grid-cols-12">
            <div className="md:col-span-8 lg:col-span-9">
                <Suspense fallback={<Loader />}>
                    <OrderDetails
                        items={cartData.cart.items}
                        payment={payment.data}
                        shipping={shippingAddress}
                    />
                </Suspense>
            </div>
            <div className="md:col-span-4 lg:col-span-3">
                <OrderSummary subtotal={cartData.cart.subTotal} />
            </div>
        </div>
    );
};
export default PlaceOrderSect;
