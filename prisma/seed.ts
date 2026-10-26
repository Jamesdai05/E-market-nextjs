import { prisma } from "@/lib/prisma";
import products from "./products.json";

const seed = async () => {
    await prisma.product.deleteMany();
    await prisma.product.createMany({
        data: products.map((product, index) => ({
            ...product,
            productId: `product-${index + 1}`,
            userId: "Admin",
        })),
    });
};


seed()
  .catch((e) => {
    console.error(e);
    process.exit(1)
  })
  .finally(()=>prisma.$disconnect())
