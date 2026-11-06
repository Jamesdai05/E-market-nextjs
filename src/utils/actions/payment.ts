"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";
import { paymentSchema } from "@/lib/schemas";



export type PaymentState = {
  success: boolean;
  message: string;
};

export const savePaymentMethod = async (prevState: PaymentState, formData: FormData): Promise<PaymentState> => {
  const session = await getCurrentSession();

  if (!session) return { success: false, message: "Please login first!" };

  const result = paymentSchema.safeParse({
    paymentMethod:formData.get("paymentMethod"),
  })

  if (!result.success) {
    return {
        success: false,
        message: "Please choose a payment method",
    };
  }

  (await cookies()).set("paymentMethod", result.data.paymentMethod, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 60 * 24 * 60,
    secure: process.env.NODE_ENV === "production"
  });

  // console.log("payment result:", result.success ? result.data.paymentMethod : result);
  redirect("/placeorder")
}