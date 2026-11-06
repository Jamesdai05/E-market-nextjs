import { number } from "zod";

export const TaxRate = 0.1;
export const freeShippingThreshold = 100;
export const shippingFee = 10;


const roundNum = (n: number) => Math.round(n * 100) / 100;

export type OrderPrice = {
  itemsPrice: number;
  shippingFee: number;
  taxPrice: number;
  totalPrice: number;
};


export const calcPrice = (itemsPrice: number): OrderPrice => {
  const items = roundNum(itemsPrice);
  const shippingFee = items > freeShippingThreshold || items === 0 ? 0 : 10;
  const taxPrice = roundNum(items * TaxRate);
  const totalPrice = shippingFee + items + taxPrice;

  return { itemsPrice: items, shippingFee, taxPrice, totalPrice };
};

export const itemsPrice = (quantity:number, unitPrice:number) => quantity * unitPrice;