export interface Sale { total: number; method: string; cancelled: boolean }

export function dailyReportZ(sales: Sale[], withDetails: boolean, withTax: boolean, round: boolean): string {
  let total = 0, cash = 0, card = 0, voucher = 0, cancelled = 0;
  for (const s of sales) {
    if (s.cancelled) {
      cancelled++;
    } else {
      if (s.method === "CASH") {
        cash += s.total;
      } else if (s.method === "CARD") {
        card += s.total;
      } else if (s.method === "MEAL_VOUCHER") {
        voucher += s.total;
      }
      total += s.total;
    }
  }
  let out = "Z " + (round ? Math.round(total) : total) + "\n";
  if (withDetails) {
    if (withTax) {
      out += "cash=" + cash + " card=" + card + " voucher=" + voucher;
    } else {
      out += "cash=" + cash + " card=" + card + " voucher=" + voucher;
    }
  }
  return out + " annulées=" + cancelled;
}
