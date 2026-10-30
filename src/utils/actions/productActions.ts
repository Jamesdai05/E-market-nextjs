// "use server";
import "server-only";
import { prisma } from "@/lib/prisma";

const convertPriceToNumber = <T extends { price: { toNumber(): number } }>(
    p: T,
) => ({
    ...p,
    price: p.price.toNumber(),
});

export const fetchAllProducts = async () => {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 8,
    });
    return products.map(convertPriceToNumber);
};

export const fetchSingleProduct = async (id: string) => {
    // console.count("Prisma findUnique called");
    try {
        const product = await prisma.product.findUnique({
            where: {
                id,
            },
        });

        // if (!product) return null;
      return product ? convertPriceToNumber(product) : null;
    } catch (e) {
        console.error("Error occurred during fetching data", e);
        return null;
    }
};
