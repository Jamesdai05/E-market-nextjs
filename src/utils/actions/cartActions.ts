"use server";

// import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
// import { auth } from "@/lib/auth";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { addToCartSchema } from "@/lib/schemas";
import { success } from "zod";

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
    // const session = await auth.api.getSession({ headers: await headers() });
    const session = await getCurrentSession();
    if (!session) {
        return {
            success: false,
            message: "Please log in to add items to your cart",
        };
    }

    try {
        // find the product whether and validate it.
        // const userId = session.user.id;
        const product = await prisma.product.findUnique({
            where: { id: result.data.productId },
            select: { id: true, countInStock: true },
        });

        if (!product) {
            return { success: false, message: "Product not found" };
        }

        // create a cart or update it under the userId
        const cart = await prisma.cart.upsert({
            where: { userId: session.user.id },
            update: {},
            create: { userId: session.user.id },
        });

        // find the cart and its productId
        const cartItemKey = { cartId: cart.id, productId: product.id };

        const existingItem = await prisma.cartItem.findUnique({
            where: { cartId_productId: cartItemKey },
        });

        // adding the same product again increases the quantity instead of creating a new row
        const currentQty = existingItem?.quantity ?? 0; //if undefined then set to 0;
        const newQty = currentQty + result.data.qty;
        if (newQty > product.countInStock) {
            return {
                success: false,
                message:
                    currentQty >= product.countInStock
                        ? "You have reached the maximum available quantity in you cart"
                        : `You can only add ${product.countInStock - currentQty} more of this items`,
            };
        }

        await prisma.cartItem.upsert({
            where: {
                cartId_productId: { cartId: cart.id, productId: product.id },
            },
            update: { quantity: newQty },
            create: {
                cartId: cart.id,
                productId: product.id,
                quantity: newQty,
            },
        });

        //refresh the cached data
        revalidatePath("/", "layout");

        return { success: true, message: "Added to cart" };
    } catch (e) {
        console.error("Error occurred while adding to cart", e);
        return {
            success: false,
            message: "Could not add to cart. Please try again.",
        };
    }
};

export const updateCartItemQty = async (
    itemId: string,
    qty: number,
): Promise<CartActionState> => {
    if (!Number.isInteger(qty) || qty < 1) {
        return { success: false, message: "Invalid quantity" };
    }

    const session = await getCurrentSession();

    if (!session) return { success: false, message: "Please log in first!" };

    // find the cart belong to the user
    try {
        const userId = session.user.id;

        const item = await prisma.cartItem.findFirst({
            where: { id: itemId, cart: { userId: userId } },
            select: { id: true, product: { select: { countInStock: true } } },
        });

        if (!item) return { success: false, message: "Item not found!" };

        // check the qty whether is greater than the stock
        if (qty > item.product.countInStock) {
            return {
                success: false,
                message: `Only ${item.product.countInStock} in stock`,
            };
        }

        await prisma.cartItem.update({
            where: { id: item.id },
            data: { quantity: qty },
        });

        revalidatePath("/", "layout"); // refresh the linetotal, subtotal and navbar
        return {
            success: true,
            message: "Quantity of the item has been updated",
        };
    } catch (err) {
        console.error("Error in updating the quantity", err);
        return { success: false, message: "Failed to update quantity!" };
    }
};


export const removeItemFromCart = async(itemId:string):Promise<CartActionState>=> {
  if (typeof itemId !== "string" || itemId.length === 0) {
    return { success: false, message: "Invalid itemId" };
  }

  // checck user is login or not
  const session = await getCurrentSession();
  if (!session) {
    return { success: false, message: "Please login first." };
  }

  try {
    const { count } = await prisma.cartItem.deleteMany({
      where: { id: itemId, cart: { is:{ userId: session.user.id }} },
    });

    if (count === 0) { return { success: false, message: "Item not found in the cart." }; };

    revalidatePath("/", "layout");

    return { success: true, message: "Item has been removed successfully!" };

  } catch (err) {
    console.error("Error in removing the items", err);
    return {success:false,message:"Could not remove the item,please try again.",}
  }

}
