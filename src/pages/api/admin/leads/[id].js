import { isAdminRequest } from "../../../../lib/adminAuth";
import { isLeadStatus } from "../../../../data/leadStatuses";
import {
  addLeadEvent,
  getLead,
  getLeadEvents,
  updateLead,
} from "../../../../lib/supabaseAdmin";

function clean(value, max = 5000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!isAdminRequest(req)) {
    return res.status(401).json({ message: "Nincs jogosultság." });
  }

  const id = typeof req.query.id === "string" ? req.query.id : "";
  if (!id) return res.status(400).json({ message: "Hiányzó lead azonosító." });

  try {
    if (req.method === "GET") {
      const lead = await getLead(id);
      if (!lead) return res.status(404).json({ message: "A lead nem található." });
      const events = await getLeadEvents(id);
      return res.status(200).json({ lead, events: events || [] });
    }

    if (req.method === "PATCH") {
      const existing = await getLead(id);
      if (!existing) return res.status(404).json({ message: "A lead nem található." });

      const patch = {};
      if (Object.prototype.hasOwnProperty.call(req.body || {}, "status")) {
        if (!isLeadStatus(req.body.status)) {
          return res.status(400).json({ message: "Érvénytelen státusz." });
        }
        patch.status = req.body.status;
      }
      if (Object.prototype.hasOwnProperty.call(req.body || {}, "internalNote")) {
        patch.internal_note = clean(req.body.internalNote, 8000);
      }

      if (!Object.keys(patch).length) {
        return res.status(400).json({ message: "Nincs módosítható adat." });
      }

      const updatedLead = await updateLead(id, patch);
      const lead = (await getLead(id)) || updatedLead;
      if (!lead) {
        throw new Error("A módosított lead nem tölthető vissza.");
      }

      if (patch.status && patch.status !== existing.status) {
        await addLeadEvent({
          lead_id: id,
          event_type: "status_changed",
          from_status: existing.status,
          to_status: patch.status,
        });
      }

      if (Object.prototype.hasOwnProperty.call(patch, "internal_note") && patch.internal_note !== existing.internal_note) {
        await addLeadEvent({
          lead_id: id,
          event_type: "note_updated",
          from_status: lead?.status || existing.status,
          to_status: lead?.status || existing.status,
        });
      }

      const events = await getLeadEvents(id);
      return res.status(200).json({ lead, events: events || [] });
    }

    res.setHeader("Allow", "GET, PATCH");
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Lead update error:", error);
    return res.status(500).json({ message: "A lead módosítása nem sikerült." });
  }
}
