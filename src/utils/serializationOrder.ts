import type { Prisma } from "@/generated/prisma/client";

// Shared query configuration
export const orderInclude = {
    orderItems: {
        orderBy: { createdAt: "asc" },
    },
    user: {
        select: {
            name: true,
            email: true,
        },
    },
} as const satisfies Prisma.OrderInclude;

type OrderWithRelations = Prisma.OrderGetPayload<{
    include: typeof orderInclude;
}>;

export const serializeOrder = (order: OrderWithRelations) => ({
    ...order,
    itemsPrice: order.itemsPrice.toNumber(),
    taxPrice: order.taxPrice.toNumber(),
    shippingPrice: order.shippingPrice.toNumber(),
    totalPrice: order.totalPrice.toNumber(),

    orderItems: order.orderItems.map((item) => ({
        ...item,
        price: item.price.toNumber(),
        lineTotal: item.price.toNumber() * item.quantity,
    })),
});
