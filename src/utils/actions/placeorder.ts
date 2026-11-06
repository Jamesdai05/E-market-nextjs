"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getCurrentSession } from "@/lib/session";
import { paymentSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";
import { calcPrice,itemsPrice } from "../priceCaculation";

export type PlaceOrder = { success: boolean; message: string; };
class OrderError extends Error { }; //  to create an extends error for thrown in the transaction.

export const placeOrder = async ():Promise<PlaceOrder> => {
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Please log in first" };


  const userId = session.user.id;

  const [shipping, cookieStore] = await Promise.all([
    prisma.shippingAddress.findUnique({ where: { userId } }),
    cookies(),
  ]);


  // check the shipping address
  if (!shipping) return { success: false, message: "Please add a shipping address first!" };

  const payment = paymentSchema.safeParse({
    paymentMethod:cookieStore.get("paymentMethod")?.value,
  })

  if (!payment.success) return { success: false, message: "Please add a payment method first" }

  let orderId: string;

  try {
      orderId = await prisma.$transaction(async (tx) => {
          // always load the cart from the database
          const cart = await tx.cart.findUnique({
              where: { userId },
              select: {
                  items: {
                      select: {
                          quantity: true,
                          product: {
                              select: {
                                  id: true,
                                  name: true,
                                  image: true,
                                  price: true,
                                  status: true,
                              },
                          },
                      },
                  },
              },
          });

        const items = cart?.items ?? [];

        if (items.length === 0) throw new OrderError("The cart is empty!");

        // to check that every product must be still on sale
        const unavailable = items.find(i => i.product.status !== "ACTIVE");

        if(unavailable){ throw new OrderError(`${unavailable.product.name} is no longer available. Please remove it from your cart.`)}

        for (const item of items) {
          const { count } = await tx.product.updateMany({
            where: { id: item.product.id, countInStock: { gte: item.quantity } },
            data: { countInStock: { decrement: item.quantity } }  // to reduce the quantity of the item from the stock.
          });

          if (count === 0) {
            throw new OrderError(`Not enough stock for the ${item.product.name}. Please update your cart!`)
          }
        }
        const netItemsPrice = items.reduce((sum, i) => sum + itemsPrice(Number(i.product.price), i.quantity), 0);

        const prices = calcPrice(netItemsPrice);

        // to create an order with the snapshots of the address and items

        const order = await tx.order.create({
          data: {
            userId,
            shippingName: shipping.shippingName,
            address: shipping.address,
            city: shipping.city,
            postalCode: shipping.postalCode,
            country: shipping.country,
            phone: shipping.phone,

            paymentMethod: payment.data.paymentMethod,
            ...prices,

            orderItems: {
              create: items.map(i => ({
                productId: i.product.id,
                name: i.product.name,
                price: i.product.price,
                image: i.product.image,
                quantity:i.quantity
              })),
            },
          },
          select:{id:true},
        })
        // to empty the cart
        await tx.cartItem.deleteMany({ where: { cart: { userId } } });
        return order.id;
      });
  } catch (e) {
    if (e instanceof OrderError) return { success: false, message: e.message };
    console.error("Error in placing order", e);
    return {
        message: "Could not place your order, please try again.",
        success: false,
    };
  }
  revalidatePath("/", "layout");
  redirect(`/orders/${orderId}`)
}