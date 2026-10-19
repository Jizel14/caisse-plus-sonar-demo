export type Method = "CASH" | "CARD" | "MEAL_VOUCHER";
export interface PaymentResult { accepted: boolean; change: number; reason?: string }

// US1.3 : encaissement
export function pay(due: number, tendered: number, method: Method): PaymentResult {
  if (tendered < due) return { accepted: false, change: 0, reason: "Montant insuffisant" };
  if (method !== "CASH" && tendered !== due) return { accepted: false, change: 0, reason: "Montant exact requis" };
  return { accepted: true, change: Math.round((tendered - due) * 1000) / 1000 };
}
