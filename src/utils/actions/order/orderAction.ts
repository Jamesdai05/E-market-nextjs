import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";



export const getOrderById=cache(async(orderId: string)=>{
  const session = await getCurrentSession();

  if (!session) return null;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: { orderBy: { createdAt: "asc" } },
        user:{select:{name:true,email:true}},
      }
    })

    if (!order) return null

    //check the ownership
    const checkIsOwner = session.user.id === order.userId;
    if (!checkIsOwner) return null;

    return {
      ...order,
      itemsPrice: order.itemsPrice.toNumber(),
      taxPrice: order.taxPrice.toNumber(),
      shippingPrice: order.shippingPrice.toNumber(),
      totalPrice: order.totalPrice.toNumber(),
      orderItems: order.orderItems.map(item => ({
        ...item,
        price: item.price.toNumber(),
        lineTotal:item.price.toNumber() * item.quantity,
      }))
    }

  } catch (error) {
    console.error("Error occurred in getting data", error);
    return null;
  }
})

export type OrderData = NonNullable<Awaited<ReturnType<typeof getOrderById>>>;
