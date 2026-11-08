import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";



export const getOrderById=cache(async(orderId: string)=>{
  const session = await getCurrentSession();

  if (!session) return null;

  // database errors are not caught here, so they show an error page instead of a 404
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
})

export type OrderData = NonNullable<Awaited<ReturnType<typeof getOrderById>>>;
