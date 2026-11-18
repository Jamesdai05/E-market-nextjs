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
  values?: Record<string, string>;
};

export const saveShippingDetails = async(
  prevState: ShippingState,
  formData:FormData,
): Promise<ShippingState> => {

  // check the session, whos is submitting?
  const session = await getCurrentSession();
  if (!session) return { success: false, message: "Please login first" };

  // read and validate the data
  const values = {
    shippingName: String(formData.get("shippingName") ?? ""),
    address: String(formData.get("address") ?? ""),
    city: String(formData.get("city") ?? ""),
    postalCode: String(formData.get("postalCode") ?? ""),
    country: String(formData.get("country") ?? ""),
  };

  const result = shippingInfoSchema.safeParse({
    ...values,
  });

  if (!result.success) {
    return {
      success: false,
      message: "Please check the highlighted fields",
      errors: z.flattenError(result.error).fieldErrors,
      values,
    }
  }

  try {
    await prisma.shippingAddress.upsert({
      where: { userId: session.user.id },
      update: result.data,
      create:{userId:session.user.id, ...result.data},
    })
  } catch(e) {
    console.error("Error saving the shipping info", e)
    return {success:false,message:"Could not save the shipping info.Please try again."}
  }

  redirect("/payment")
}