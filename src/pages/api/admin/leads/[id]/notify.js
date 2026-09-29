import { isAdminRequest } from "../../../../../lib/adminAuth";
import {
  addLeadEvent,
  getLead,
  markLeadNotification,
} from "../../../../../lib/supabaseAdmin";
import {
  sendLeadNotification,
  smtpNotificationConfigured,
} from "../../../../../lib/leadNotification";

function clean(value, max = 1000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!isAdminRequest(req)) {
    return res.status(401).json({ message: "Nincs jogosultság." });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const id = typeof req.query.id === "string" ? req.query.id : "";
  if (!id) return res.status(400).json({ message: "Hiányzó lead azonosító." });

  if (!smtpNotificationConfigured()) {
    return res.status(503).json({
      code: "smtp_not_configured",
      message: "Az SMTP értesítés még nincs konfigurálva.",
    });
  }

  try {
    const lead = await getLead(id);
    if (!lead) return res.status(404).json({ message: "A lead nem található." });

    await markLeadNotification(id, {
      status: "pending",
      sentAt: lead.notification_sent_at || null,
      error: "",
    });

    try {
      const info = await sendLeadNotification(lead);
      const updatedLead = await markLeadNotification(id, {
        status: "sent",
        sentAt: new Date().toISOString(),
        error: "",
      });
      await addLeadEvent({
        lead_id: id,
        event_type: "notification_sent",
        from_status: lead.status,
        to_status: lead.status,
        details: info.messageId ? `Értesítés újraküldve. SMTP message ID: ${info.messageId}` : "Értesítés újraküldve.",
      });
      return res.status(200).json({ lead: updatedLead, message: "Az értesítő e-mail elküldve." });
    } catch (error) {
      const message = clean(error?.message || "SMTP küldési hiba.");
      const updatedLead = await markLeadNotification(id, {
        status: "failed",
        sentAt: lead.notification_sent_at || null,
        error: message,
      });
      await addLeadEvent({
        lead_id: id,
        event_type: "notification_failed",
        from_status: lead.status,
        to_status: lead.status,
        details: message,
      });
      return res.status(502).json({ lead: updatedLead, message: "Az e-mail küldése nem sikerült." });
    }
  } catch (error) {
    console.error("Manual lead notification error:", error);
    return res.status(500).json({ message: "Az értesítés nem sikerült." });
  }
}
