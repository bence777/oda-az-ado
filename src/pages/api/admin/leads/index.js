import { isAdminRequest } from "../../../../lib/adminAuth";
import { listLeads } from "../../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!isAdminRequest(req)) {
    return res.status(401).json({ message: "Nincs jogosultság." });
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const leads = await listLeads({ limit: req.query.limit });
    return res.status(200).json({ leads });
  } catch (error) {
    console.error("Lead list error:", error);
    return res.status(500).json({ message: "A leadek betöltése nem sikerült." });
  }
}
