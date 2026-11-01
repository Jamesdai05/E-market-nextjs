import "server-only";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";
import { cache } from "react";

export const getUserCart = cache(async () => {
    const session = await getCurrentSession();

    if (!session)
        return {
            success: false,
            message: "please log in first!",
            cart: null,
        };

    // const userId = session?.userId;

    const userCart = await prisma.cart.findUnique({
        where: {
            userId: session.user.id,
        },
        select: {
            id: true,
            items: {
                orderBy: { createdAt: "asc" },
                select: {
                    id: true,
                    quantity: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                            countInStock: true,
                            price: true,
                        },
                    },
                },
            },
        },
    });

    const items = (userCart?.items ?? []).map((item) => {
        const price = item.product.price.toNumber();
        return {
            id: item.id,
            quantity: item.quantity,
            lineTotal: price * item.quantity,
            product: { ...item.product, price },
        };
    });

    return {
        success: true,
        message: "Cart information has been successfully retrieved!",
        cart: {
            id: userCart?.id ?? null,
            items,
            itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
            subTotal: items.reduce((sum, i) => sum + i.lineTotal, 0),
        },
    };
});

export type CartData = NonNullable<
    Awaited<ReturnType<typeof getUserCart>>["cart"]
>;
export type CartItem = CartData["items"][number];
