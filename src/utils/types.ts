import type { Product} from "@/generated/prisma/client";

// omit the original price type and add the new type
export type ProductDTO = Omit<Product, "price"> & { price: number; };

