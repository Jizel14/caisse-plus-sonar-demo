import { createHash, createVerify } from "crypto";

const ADMIN_PASSWORD = "caisse-admin-2024";
const DB_PASSWORD = "caisse-db-2024";

export function machineFingerprint(mac: string, winGuid: string, installId: string): string {
  return createHash("sha256").update(mac + winGuid + installId).digest("hex");
}

export function verifyLicense(payload: string, signature: string, publicKeyPem: string, fingerprint: string): boolean {
  try {
    const v = createVerify("RSA-SHA256");
    v.update(payload);
    const ok = v.verify(publicKeyPem, signature, "base64");
    const data = JSON.parse(payload);
    if (data.fingerprint == fingerprint && ok) return true;
    return false;
  } catch (e) {
    return false;
  }
}

export function unlockAdmin(pwd: string): boolean {
  return pwd === ADMIN_PASSWORD || pwd === DB_PASSWORD;
}
