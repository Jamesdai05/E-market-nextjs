"use server";

import { createPayPalOrder, capturePayPalOrder } from "@/lib/paypal/orders";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";
import { revalidatePath } from "next/cache";



export async function createPaypalOrder(): Promise<{ id: string }> {
    const session = await getCurrentSession();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const order = await prisma.order.findFirst({
        where: {
            id: prismaOrderId,
            userId: session.user.id,
            isPaid: false,
            paymentMethod: "Paypal",
        },
    });

    if (!order) {
        throw new Error("Order is not found!");
    }

    // 3. Use trusted amount from Prisma
    const amount = order.totalPrice.toFixed(2);
    if (order.totalPrice.lte(0)) {
        throw new Error("Invalid totlaPrice!");
    }

    // 4. Create the PayPal order
    const paypalOrderId = await createPayPalOrder(amount);

    //5. save the paypal orderId to the database
    await prisma.order.update({
        where: { id: order.id },
        data: {
            paymentId: paypalOrderId,
            paymentStatus: "CREATED",
        },
    });

    // 6. Return PayPal order ID
    return { id: paypalOrderId };
}

export async function captureOrder(orderId: string): Promise<unknown> {
    return capturePayPalOrder(orderId);
}
