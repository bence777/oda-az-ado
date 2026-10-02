import crypto from "crypto";
import {
  addLeadEvent,
  checkContactRateLimit,
  insertLead,
  markLeadNotification,
} from "../../lib/supabaseAdmin";
import {
  sendLeadNotification,
  smtpNotificationConfigured,
} from "../../lib/leadNotification";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function getIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function hashIp(ip) {
  const secret = process.env.CONTACT_RATE_LIMIT_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (!secret) return crypto.createHash("sha256").update(ip).digest("hex");
  return crypto.createHmac("sha256", secret).update(ip).digest("hex");
}

function clean(value, max = 2000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const allowed = {
  monthlyDocuments: ["0–50", "51–100", "101–250", "251–500", "500+"],
  bankAccounts: ["1", "2", "3", "4+"],
  employees: ["0–3", "4–10", "11–25", "26+"],
  foreignTransactions: ["Nincs", "EU-n belüli ügyletek", "EU-n kívüli ügyletek", "Mindkettő"],
  reason: ["Könyvelőt váltanék", "Új vállalkozás", "Meglévő vállalkozás új könyvelőt keres", "Könyvelési szolgáltatás bővítése", "Adótanácsadás", "Egyéb"],
  plannedStart: ["Azonnal", "1–3 hónapon belül", "2027. január 1-től", "Később"],
};

function isAllowed(key, value) {
  return allowed[key]?.includes(value);
}

async function saveNotificationResult(lead, result) {
  try {
    if (result.status === "sent") {
      await markLeadNotification(lead.id, {
        status: "sent",
        sentAt: new Date().toISOString(),
        error: "",
      });
      await addLeadEvent({
        lead_id: lead.id,
        event_type: "notification_sent",
        from_status: lead.status,
        to_status: lead.status,
        details: result.messageId ? `SMTP message ID: ${result.messageId}` : "Értesítő e-mail elküldve.",
      });
      return;
    }

    await markLeadNotification(lead.id, {
      status: result.status,
      sentAt: null,
      error: result.error || "",
    });
    await addLeadEvent({
      lead_id: lead.id,
      event_type: result.status === "not_configured" ? "notification_skipped" : "notification_failed",
      from_status: lead.status,
      to_status: lead.status,
      details: result.error || "",
    });
  } catch (error) {
    console.error("Notification state save failed:", error);
  }
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const body = req.body || {};
  if (clean(body.website, 200)) return res.status(204).end();

  const startedAt = Number(body.startedAt || 0);
  if (!startedAt || Date.now() - startedAt < 3000) {
    return res.status(400).json({ message: "Az űrlap túl gyorsan érkezett be." });
  }

  const payload = {
    name: clean(body.name, 160),
    company: clean(body.company, 200),
    email: clean(body.email, 200).toLowerCase(),
    phone: clean(body.phone, 80),
    taxId: clean(body.taxId, 60),
    monthlyDocuments: clean(body.monthlyDocuments, 40),
    bankAccounts: clean(body.bankAccounts, 20),
    employees: clean(body.employees, 20),
    foreignTransactions: clean(body.foreignTransactions, 80),
    reason: clean(body.reason, 120),
    plannedStart: clean(body.plannedStart, 80),
    message: clean(body.message, 5000),
  };

  const privacyAccepted = body.privacy === "on" || body.privacy === true;
  const requiredOk = privacyAccepted && payload.name && payload.company && payload.email && payload.phone && payload.taxId &&
    isEmail(payload.email) && isAllowed("monthlyDocuments", payload.monthlyDocuments) &&
    isAllowed("bankAccounts", payload.bankAccounts) && isAllowed("employees", payload.employees) &&
    isAllowed("foreignTransactions", payload.foreignTransactions) && isAllowed("reason", payload.reason) &&
    isAllowed("plannedStart", payload.plannedStart);

  if (!requiredOk) {
    return res.status(400).json({ message: "Kérjük, ellenőrizze a kötelező mezőket." });
  }

  const ipHash = hashIp(getIp(req));

  try {
    const limited = await checkContactRateLimit(ipHash, {
      windowMs: WINDOW_MS,
      maxRequests: MAX_REQUESTS,
    });
    if (limited) {
      return res.status(429).json({ message: "Túl sok próbálkozás. Kérjük, próbálja újra később." });
    }

    const lead = await insertLead({
      status: "Új érdeklődő",
      source: "odaazado.hu",
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      tax_id: payload.taxId,
      monthly_documents: payload.monthlyDocuments,
      bank_accounts: payload.bankAccounts,
      employees: payload.employees,
      foreign_transactions: payload.foreignTransactions,
      reason: payload.reason,
      planned_start: payload.plannedStart,
      message: payload.message,
      privacy_accepted_at: new Date().toISOString(),
      ip_hash: ipHash,
      user_agent: clean(req.headers["user-agent"], 500),
      notification_status: smtpNotificationConfigured() ? "pending" : "not_configured",
    });

    try {
      await addLeadEvent({
        lead_id: lead.id,
        event_type: "created",
        from_status: null,
        to_status: lead.status,
      });
    } catch (eventError) {
      console.error("Lead event creation failed:", eventError);
    }

    if (!smtpNotificationConfigured()) {
      await saveNotificationResult(lead, {
        status: "not_configured",
        error: "Az SMTP értesítés még nincs konfigurálva.",
      });
    } else {
      try {
        const info = await sendLeadNotification(lead);
        await saveNotificationResult(lead, { status: "sent", messageId: info.messageId });
      } catch (notificationError) {
        console.error("Lead notification failed:", notificationError);
        await saveNotificationResult(lead, {
          status: "failed",
          error: clean(notificationError?.message || "SMTP küldési hiba.", 1000),
        });
      }
    }

    return res.status(200).json({ ok: true, leadId: lead.id });
  } catch (error) {
    console.error("Contact lead creation failed:", error);
    const notConfigured = error?.code === "supabase_not_configured";
    return res.status(notConfigured ? 503 : 500).json({
      code: notConfigured ? "database_not_configured" : "lead_save_failed",
      message: notConfigured
        ? "Az ajánlatkérő adatbázis még nincs konfigurálva."
        : "Az ajánlatkérést most nem sikerült biztonságosan elmenteni.",
    });
  }
}
