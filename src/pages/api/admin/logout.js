import { clearAdminSessionCookie } from "../../../lib/adminAuth";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }
  res.setHeader("Set-Cookie", clearAdminSessionCookie());
  return res.status(200).json({ ok: true });
}
