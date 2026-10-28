import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

export const fetchTopProducts = async () => {
  "use cache";

  cacheLife("minutes");
  cacheTag("top-products");

    const products = await prisma.product.findMany({
        where: {
            rating: {
                gt: 4.5,
            },
        },
        orderBy: { rating: "desc" },
        take: 4,
    });
  return products.map(product=>{
    return {
      ...product,
      price:product.price.toNumber(),
    }
  });
};
