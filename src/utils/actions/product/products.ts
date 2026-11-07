import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag } from "next/cache";

export const fetchTopProducts = async () => {
    "use cache"; // using the cache directive  and use server directive which may need to be applied seperatly.

    cacheLife("minutes");
    cacheTag("top-products");

    const products = await prisma.product.findMany({
        where: {
            status: "ACTIVE",
            rating: {
                gt: 4.5,
        },
            countInStock:{gt:0},
        },
        orderBy: { rating: "desc" },
        take: 4,
    });
    return products.map((product) => {
        return {
            ...product,
            price: product.price.toNumber(),
        };
    });

    // debugging purpose

    // return [
    //     {
    //         id: "1",
    //         name: "Mouse",
    //     },
    //     {
    //         id: "2",
    //         name: "Wireless keyboard",
    //     },
    // ];
};
