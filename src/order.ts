export interface OrderLine { sku: string; unitPrice: number; quantity: number }
export interface Customer { id: string; vip: boolean }
export const MIN_QTY = 1;
export const MAX_QTY = 99;
export const DISCOUNT_THRESHOLD = 100;
export const DISCOUNT_RATE = 0.1;

export function validateQuantity(q: number): boolean {
  return Number.isInteger(q) && q >= MIN_QTY && q <= MAX_QTY;
}

export function orderTotal(lines: OrderLine[]): number {
  let total = 0;
  for (const l of lines) {
    if (!validateQuantity(l.quantity)) throw new Error("Quantité invalide : " + l.quantity);
    total += l.unitPrice * l.quantity;
  }
  return total;
}

// US1.2 : remise unique, non cumulée (VIP ou montant > 100 DT)
export function applyDiscount(total: number, customer: Customer): number {
  const eligible = customer.vip || total > DISCOUNT_THRESHOLD;
  return eligible ? Math.round(total * (1 - DISCOUNT_RATE) * 1000) / 1000 : total;
}
