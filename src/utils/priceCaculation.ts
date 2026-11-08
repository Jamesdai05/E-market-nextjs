export const TaxRate = 0.1;
export const freeShippingThreshold = 100;
export const shippingFee = 10;


export const roundNum = (n: number) => Math.round(n * 100) / 100;

export type OrderPrice = {
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};


export const calcPrice = (itemsPrice: number): OrderPrice => {
  const items = roundNum(itemsPrice);
  const shippingPrice = items > freeShippingThreshold || items === 0 ? 0 : shippingFee;
  const taxPrice = roundNum(items * TaxRate);
  const totalPrice = roundNum(items + shippingPrice + taxPrice);

  return { itemsPrice: items, shippingPrice, taxPrice, totalPrice };
};

export const itemsPrice = (quantity:number, unitPrice:number) => quantity * unitPrice;