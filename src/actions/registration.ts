import { auth } from "@/lib/auth";
import { registrationSchema } from "@/lib/schemas";
import { isAPIError } from "better-auth/api";
import z from "zod";


type RegistrationState = {
    message: string;
    success: boolean;
    errors?: Record<string, string[]>;
};

export const registration = async (
    prevState: RegistrationState,
    formData: FormData,
):Promise<RegistrationState> => {

    const result = registrationSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword:formData.get("confirmPassword"),
  })

    // if one of the fields are missing and other errors from validation
    if (!result.success) {
      return {
        success: false,
        message: "Please check the highlighted fields",
        errors: z.flattenError(result.error).fieldErrors,
      }
    }

    // for successful data
    const { name, email, password } = result.data;

    try {
      await auth.api.signUpEmail({
        body: {
          name,email,password,
        }
      })

      return {
        message: "Account has been created successfully!",
        success: true,
      }
    } catch (error) {
      // check in the error type and return the object
      if (isAPIError(error)) {
        return {
          success: false,
          message:error.message,
        }
      }

      return {
        message: "Error occurred during registration.Please try again.",
        success:false,
      };
    }
};
