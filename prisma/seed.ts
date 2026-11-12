import "dotenv/config";
import { prisma } from "@/lib/prisma";
import products from "./products.json";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "node:crypto";

const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env variable: ${key}`);
  return value;
};

const createUser = async (opts: {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
}) => {
  const user = await prisma.user.create({
    data: {
      name: opts.name,
      email: opts.email || process.env.SEED_ADMIN_NAME!,
      emailVerified: true,
      role: opts.role ?? "user",
    },
  });

  // Better Auth stores the hashed password in Account, with accountId = user.id
  await prisma.account.create({
    data: {
      id: randomUUID(),
      userId: user.id,
      accountId: user.id,
      providerId: "credential",
      password: await hashPassword(opts.password),
    },
  });

  return user;
};

const seed = async () => {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();

  await prisma.product.deleteMany();

  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();


  const admin = await createUser({
    name: "Admin",
    password: requireEnv("SEED_ADMIN_PASSWORD") ?? "Admin123456",
    email: requireEnv("SEED_ADMIN_EMAIL") ?? "admina123@minmart.dev",
    role:"admin",
  });

  await prisma.product.createMany({
    data: products.map((product, index) => ({
      ...product,
      userId: admin.id,
    })),
  });
  console.log(`🌱 Data seeding by ${admin.email} is successfully,total ${products.length} product added!`);
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
