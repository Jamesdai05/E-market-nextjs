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

export type loginInput = z.infer<typeof loginSchema>

export type registrationInput = z.infer<typeof registrationSchema>;
