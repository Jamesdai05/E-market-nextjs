/*
  Warnings:

  - Added the required column `address` to the `ShippingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShippingAddress" ADD COLUMN     "address" TEXT NOT NULL;
