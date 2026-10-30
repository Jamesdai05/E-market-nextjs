"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { addToCartSchema } from "@/lib/schemas";

export type CartActionState = {
    success: boolean;
    message: string;
};

// add to cart action
export const addToCart = async (
    productId: string,
    qty: number,
): Promise<CartActionState> => {
    // server actions are public endpoints, so always re-validate the input
    const result = addToCartSchema.safeParse({ productId, qty });
    if (!result.success) {
        return { success: false, message: "Invalid product or quantity" };
    }

    // the user id comes from the session cookie, never from the client
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return { success: false, message: "Please log in to add items to your cart" };
    }

  try {
      // find the product whether and validate it.
        const product = await prisma.product.findUnique({
            where: { id: result.data.productId },
            select: { id: true, countInStock: true },
        });

        if (!product) {
            return { success: false, message: "Product not found" };
        }

        // create a cart or update it.
        const cart = await prisma.cart.upsert({
            where: { userId: session.user.id },
            update: {},
            create: { userId: session.user.id },
        });

        const existingItem = await prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId: cart.id, productId: product.id } },
        });

        // adding the same product again increases the quantity instead of creating a new row
        const newQty = (existingItem?.quantity ?? 0) + result.data.qty;
        if (newQty > product.countInStock) {
            return {
                success: false,
                message: `Only ${product.countInStock} in stock (you already have ${existingItem?.quantity ?? 0} in your cart)`,
            };
        }

        await prisma.cartItem.upsert({
            where: { cartId_productId: { cartId: cart.id, productId: product.id } },
            update: { quantity: newQty },
            create: { cartId: cart.id, productId: product.id, quantity: newQty },
        });

        revalidatePath("/cart");

        return { success: true, message: "Added to cart" };
    } catch (e) {
        console.error("Error occurred while adding to cart", e);
        return { success: false, message: "Could not add to cart. Please try again." };
    }
};
