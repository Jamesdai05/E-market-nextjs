import { prisma } from "@/lib/prisma";
import products from "./products.json";
import { log } from "console";

const seed = async () => {
    await prisma.product.deleteMany();

    const admin = await prisma.user.findFirst({
        where: { role: "admin" },
    });

    if (!admin) throw new Error("Admin user not found!");

    await prisma.product.deleteMany();
    await prisma.product.createMany({
        data: products.map((product, index) => ({
            ...product,
            productId: `product-${index + 1}`,
            userId: admin.id,
        })),
    });
  console.log("🌱 Data seeding is successfully!");
};

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
