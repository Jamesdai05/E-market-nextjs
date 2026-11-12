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

export const currencyFormatter = new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" });

export const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Profile", href: "/profile" },
];

export const adminLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "UsersList", href: "/admin/users" },
    { label: "ProductsList", href: "/admin/products" },
    { label: "Profile", href: "/profile" },
    { label: "ordersList", href: "/admin/orders" },
];