import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";
import { orderInclude, serializeOrder } from "@/utils/serializationOrder";
import { redirect } from "next/navigation";

export const getOrderById = cache(async (orderId: string) => {
    const session = await getCurrentSession();

    if (!session) return null;

    // database errors are not caught here, so they show an error page instead of a 404
    const order = await prisma.order.findFirst({
        where: { id: orderId,userId:session.user.id },
        include: {
            orderItems: { orderBy: { createdAt: "asc" } },
            user: { select: { name: true, email: true } },
        },
    });

    if (!order) return null;

    //check the ownership
    const checkIsOwner = session.user.id === order.userId;
    if (!checkIsOwner) return null;

    return serializeOrder(order);
});

export const getOrdersByUser = cache(async () => {
    const session = await getCurrentSession();
    if (!session) return null;

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        include: orderInclude,
        orderBy: { createdAt: "desc" },
    });
    return orders.map(serializeOrder);
});


export const getAllOrderByAdmin = cache(async () => {
  const session = await getCurrentSession();

  if(!session) redirect("/login");

  if (session.user.role !== "admin") redirect("/");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  });
})

export type OrderData = NonNullable<Awaited<ReturnType<typeof getOrderById>>>;

export type OrdersData = NonNullable<
    Awaited<ReturnType<typeof getOrdersByUser>>
>;
