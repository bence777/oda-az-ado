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

export default async function handler(req, res) {
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
    intent: clean(body.intent, 120),
    message: clean(body.message, 5000),
  };

  const privacyAccepted = body.privacy === "on" || body.privacy === true;

  if (!privacyAccepted || !payload.name || !payload.email || !payload.message || !isEmail(payload.email)) {
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
        subject: `Kapcsolatfelvétel${payload.company ? ` – ${payload.company}` : ""}`,
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
