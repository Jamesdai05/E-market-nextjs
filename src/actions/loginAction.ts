"use server";

import { auth } from "@/lib/auth";
import { loginSchema } from "@/lib/schemas";
import { isAPIError } from "better-auth/api";
import z from "zod";

export type LoginState = {
    message: string;
    success: boolean;
    errors?: Record<string, string[]>;
};

export const registration = async (
  prevState: LoginState,
    formData: FormData,
): Promise<LoginState> => {
  const result = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // if one of the fields are missing and other errors from validation
    if (!result.success) {
        return {
            success: false,
            message: "Please check the highlighted fields",
            errors: z.flattenError(result.error).fieldErrors,
        };
    }

    // for successful data
    const { email, password } = result.data;

    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        return {
            message: "login successfully!",
            success: true,
        };
    } catch (error) {
        // check in the error type and return the object
        if (isAPIError(error)) {
            return {
                success: false,
                message: error.message,
            };
        }

        return {
            message: "Error occurred during login.Please try again.",
            success: false,
        };
    }
};
