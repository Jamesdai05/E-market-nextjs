import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8, "Length of the password must be at least 8."),
});

export const registrationSchema = z
    .object({
        name: z.string().min(1, "Name at least to be 1."),
        email: z.email(),
        password: z
            .string()
            .min(8, "Length of the password must be at least 8."),
        confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Passwords not match",
        path: ["confirmPassword"],
    });

export const addToCartSchema = z.object({
    productId: z.string().min(1),
    qty: z.number().int().min(1).max(10),
});


export const shippingInfoSchema = z.object({
  shippingName:z.string().trim().min(2,"Please enter the recipient's name").max(60),
  address: z.string().trim().min(5, "Address at least to be 5.").max(60,"Address is too long"),
  city: z.string().trim().min(1, "City name is required.").max(30,"City name is too long."),
  postalCode: z.string().trim().min(3,"Postal is required").max(10,"Postalcode is too long").regex(/^[A-Za-z0-9]+$/,"Postcal code can only contain letters, numbers,spaces and dashes!"),
  country: z.string().trim().min(2, "Country at least to be 2 characters.").max(60, "Country name is too long!"),
  phone: z.string().trim().min(6).max(20).optional(),
})


export const paymentSchema = z.object({
  paymentMethod: z.enum(["paypal","stripe"]),
})

// reuse the schema above
export const createOrderSchema =shippingInfoSchema.safeExtend(paymentSchema.shape)

// below is for the useForm hook
export type loginInput = z.infer<typeof loginSchema>

export type registrationInput = z.infer<typeof registrationSchema>;

export type shippingInfoInput = z.infer<typeof shippingInfoSchema>

export type PaymentInput = z.infer<typeof paymentSchema>;

export type createOrderInput = z.infer<typeof createOrderSchema>;


