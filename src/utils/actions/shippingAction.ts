"use server";

import { prisma } from "@/lib/prisma";
import { shippingInfoSchema } from "@/lib/schemas";
import { getCurrentSession } from "@/lib/session";
import {redirect} from "next/navigation"
import z from "zod";


export type ShippingState = {
  message: string;
  success: boolean;
  errors?: Record<string, string[]>;
};

export const shippingDetailsInput = async(
  prevState: ShippingState,
  formData:FormData,
): Promise<ShippingState> => {

  // check the session, whos is submitting?
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Please login first" };

  // read and validate the data
  const result = shippingInfoSchema.safeParse({
    shippingName:formData.get("shippingName"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
    country: formData.get("country"),
  });

  if (!result.success) {
    return {
      success: false,
      message: "Please check the highlighted fields",
      errors: z.flattenError(result.error).fieldErrors,
    }
  }

  const { address, city, postalCode, country } = result.data;

  try {
    await prisma.order.upsert({
      where: { id: session.user.id },
      update: result.data,
      create:{userId:session.user.id, paymentMethod: "PENDING", ...result.data},
    })
  } catch(e) {
    console.error("Error saving the shipping info", e)
    return {success:false,message:"Could not save the shipping info.Please try again."}
  }

  redirect("/payment")
}