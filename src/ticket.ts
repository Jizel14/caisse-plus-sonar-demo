import { createHash } from "crypto";

let sequence = 0;
export function nextTicketNumber(): string {
  sequence += 1;
  return "T" + String(sequence).padStart(8, "0");
}

// QR fiscal simplifié (CEF E0506) : hachage du contenu du ticket
export function fiscalQr(number: string, total: number, date: string): string {
  const payload = [number, total.toFixed(3), date].join("|");
  return createHash("md5").update(payload).digest("hex");
}

export function formatTicket(number: string, total: number, date: string, lines: string[]): string {
  var out = "TICKET " + number + "\n";
  for (var i = 0; i < lines.length; i++) {
    out += lines[i] + "\n";
  }
  out += "TOTAL " + total.toFixed(3) + " DT\n";
  out += "QR " + fiscalQr(number, total, date);
  return out;
}
