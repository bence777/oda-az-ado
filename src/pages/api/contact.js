const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map();

function getIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function rateLimited(ip) {
  const now = Date.now();
  const current = requests.get(ip) || [];
  const recent = current.filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    requests.set(ip, recent);
    return true;
  }
  recent.push(now);
  requests.set(ip, recent);
  return false;
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

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const ip = getIp(req);
  if (rateLimited(ip)) {
    return res.status(429).json({ message: "Túl sok próbálkozás. Kérjük, próbálja újra később." });
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
    email: clean(body.email, 200),
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

  const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(501).json({
      code: "delivery_not_configured",
      message: "A szerveroldali kézbesítés még nincs konfigurálva.",
    });
  }

  try {
    const headers = { "Content-Type": "application/json" };
    if (process.env.CONTACT_FORM_WEBHOOK_TOKEN) {
      headers.Authorization = `Bearer ${process.env.CONTACT_FORM_WEBHOOK_TOKEN}`;
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: "odaazado.hu",
        status: "Új érdeklődő",
        submittedAt: new Date().toISOString(),
        subject: `Ajánlatkérés – ${payload.company}`,
        replyTo: payload.email,
        to: "info@odaazado.hu",
        form: payload,
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ message: "A kézbesítési szolgáltatás hibát jelzett." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(502).json({ message: "Az ajánlatkérés kézbesítése nem sikerült." });
  }
}
