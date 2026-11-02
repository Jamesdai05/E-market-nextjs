"use server";

import { shippingInfoSchema } from "@/lib/schemas";
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
  const result = shippingInfoSchema.safeParse({
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

  try
}