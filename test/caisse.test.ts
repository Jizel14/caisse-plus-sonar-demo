import { applyDiscount, orderTotal, validateQuantity } from "../src/order";
import { pay } from "../src/payment";

describe("Plan PT1 - Caisse+", () => {
  test("TC-01 client non VIP, 100 DT : pas de remise", () => {
    expect(applyDiscount(100, { id: "c1", vip: false })).toBe(100);
  });
  test("TC-02 client non VIP, 101 DT : remise appliquée", () => {
    expect(applyDiscount(101, { id: "c1", vip: false })).toBe(90.9);
  });
  test("TC-03 client VIP, 50 DT : remise appliquée", () => {
    expect(applyDiscount(50, { id: "c2", vip: true })).toBe(45);
  });
  test("TC-04 client VIP, 150 DT : remise unique non cumulée", () => {
    expect(applyDiscount(150, { id: "c2", vip: true })).toBe(135);
  });
  test("TC-05 quantités 0 et 100 refusées ; 1 et 99 acceptées", () => {
    expect([0, 100].map(validateQuantity)).toEqual([false, false]);
    expect([1, 99].map(validateQuantity)).toEqual([true, true]);
    expect(() => orderTotal([{ sku: "A", unitPrice: 1, quantity: 100 }])).toThrow();
  });
  test("TC-06 30 DT encaissés pour 40 DT : paiement refusé", () => {
    const r = pay(40, 30, "CASH");
    expect(r.accepted).toBe(false);
  });
});
