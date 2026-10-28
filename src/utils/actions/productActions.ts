"use server";

import { prisma } from "@/lib/prisma";


export const fetchAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy:{
      createdAt:"desc",
    }
  });
  return products.map(product=>{
    return {
      ...product,
      price:product.price.toNumber(),
    }
  });
}




