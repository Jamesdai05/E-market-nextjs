"use server";

// import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe/client";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export type StripeCheckoutResult =
    | { success: true; url: string }
    | { success: false; message: string };

export async function startStripeCheckOut(orderId: string):Promise<StripeCheckoutResult> {
    const session = await getCurrentSession();
  if (!session?.user?.id) return { success: false, message: "Please log in first!" };

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: session.user.id,
            isPaid: false,
            paymentMethod: "stripe",
        },
    });

    if (!order)return{success:false, message:"Order not found,please try again."};

    // reuse an open session (double click / two tabs) instead of creating a second one
    if (
        "stripeSessionId" in order &&
        typeof order.stripeSessionId === "string" &&
        order.stripeSessionId
    ) {
        const existing = await stripe.checkout.sessions.retrieve(
            order.stripeSessionId,
        );
        if (existing.status === "open" && existing.url) redirect(existing.url);
  };

  const appUrl=process.env.NEXT_PUBLIC_APP_URL!

  // create a stripe session
  const checkout = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: session.user.email,
      line_items: [
          {
              quantity: 1,
              price_data: {
                  currency: "sgd",
                  unit_amount: order.totalPrice.mul(100).toNumber(), // cents, from YOUR database
                  product_data: {
                      name: `Mini-Mart order ${order.id.slice(0, 8).toUpperCase()}`,//to indicate the order which is paid.
                  },
              },
          },
      ],
      metadata: { orderId: order.id }, // links the payment back to your order
      success_url: `${appUrl}/orders/${order.id}?paid=stripe`,
    cancel_url: `${appUrl}/orders/${order.id}`,
  });

  try {
    await prisma.order.update({
    where: { id: order.id },
    data: {
      stripeCheckoutSessionId: checkout.id,
      paymentStatus:"CREATED"
    },
    })
    return { success: true, url: checkout.url! };
  } catch (err) {
    console.error("Error in stripe payment", err);
    return {success:false,message:"Could not start payment, please try again."}
  }


  // redirect(checkout.url!)
}
