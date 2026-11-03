/*
  Warnings:

  - You are about to drop the column `postalcode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postalCode` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'ACTIVE', 'DISCONTINUED');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "postalcode",
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "sku" TEXT;
UPDATE "Product" SET "sku" = "productId";
ALTER TABLE "Product" DROP COLUMN "productId";
ALTER TABLE "Product" ADD COLUMN  "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "Product"("userId");
