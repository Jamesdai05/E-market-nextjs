// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// export const cn = (...inputs: ClassValue[]) => {
//   return twMerge(clsx(inputs));
// }

export { cn } from "cn";

export const Role = {
  ADMIN: "admin",
  USER:"user",
} as const;

export type Role=(typeof Role)[keyof typeof Role]