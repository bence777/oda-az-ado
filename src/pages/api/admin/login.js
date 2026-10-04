import crypto from "crypto";
import {
  adminAuthConfigured,
  createAdminSessionCookie,
  verifyAdminPassword,
} from "../../../lib/adminAuth";
import { checkAdminLoginRateLimit } from "../../../lib/supabaseAdmin";

function getIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function hashIp(ip) {
  const secret = process.env.ADMIN_SESSION_SECRET || "oda-admin-login";
  return crypto.createHmac("sha256", secret).update(ip).digest("hex");
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!adminAuthConfigured()) {
    return res.status(503).json({ message: "Az admin belépés még nincs konfigurálva." });
  }

  try {
    const limited = await checkAdminLoginRateLimit(hashIp(getIp(req)), {
      windowMs: 15 * 60 * 1000,
      maxRequests: 10,
    });
    if (limited) {
      return res.status(429).json({ message: "Túl sok belépési próbálkozás. Próbáld újra később." });
    }
  } catch (error) {
    console.error("Admin login rate limit check failed:", error);
  }

  if (!verifyAdminPassword(req.body?.password)) {
    return res.status(401).json({ message: "Hibás jelszó." });
  }

  res.setHeader("Set-Cookie", createAdminSessionCookie());
  return res.status(200).json({ ok: true });
}
