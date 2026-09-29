function getConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    const error = new Error("Supabase server configuration is missing.");
    error.code = "supabase_not_configured";
    throw error;
  }

  return { url: url.replace(/\/$/, ""), key };
}

function buildHeaders(key, extra = {}) {
  const headers = {
    apikey: key,
    "Content-Type": "application/json",
    ...extra,
  };

  // Legacy service_role keys are JWTs. New sb_secret_* keys are sent as apikey only.
  if (key.startsWith("eyJ")) {
    headers.Authorization = `Bearer ${key}`;
  }

  return headers;
}

async function parseResponse(response) {
  if (response.ok) {
    if (response.status === 204) return null;
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  const details = await response.text();
  const error = new Error(`Supabase request failed (${response.status}).`);
  error.status = response.status;
  error.details = details;
  throw error;
}

export async function supabaseRequest(path, options = {}) {
  const { url, key } = getConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: buildHeaders(key, options.headers),
  });

  return parseResponse(response);
}

export async function insertLead(lead) {
  const rows = await supabaseRequest("leads", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(lead),
  });

  return Array.isArray(rows) ? rows[0] : rows;
}

export async function listLeads({ limit = 100 } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 250);
  return supabaseRequest(
    `leads?select=*&order=created_at.desc&limit=${safeLimit}`,
    { method: "GET" },
  );
}

export async function getLead(id) {
  const rows = await supabaseRequest(
    `leads?id=eq.${encodeURIComponent(id)}&select=*&limit=1`,
    { method: "GET" },
  );
  return Array.isArray(rows) ? rows[0] || null : null;
}

export async function getLeadEvents(id, { limit = 100 } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 100, 1), 250);
  return supabaseRequest(
    `lead_events?lead_id=eq.${encodeURIComponent(id)}&select=*&order=created_at.desc&limit=${safeLimit}`,
    { method: "GET" },
  );
}

export async function updateLead(id, patch) {
  const rows = await supabaseRequest(`leads?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
  });

  return Array.isArray(rows) ? rows[0] || null : rows;
}

export async function addLeadEvent(event) {
  await supabaseRequest("lead_events", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(event),
  });
}

export async function markLeadNotification(id, { status, sentAt = null, error = "" }) {
  return updateLead(id, {
    notification_status: status,
    notification_sent_at: sentAt,
    notification_error: error,
  });
}

export async function checkContactRateLimit(ipHash, { windowMs = 15 * 60 * 1000, maxRequests = 5 } = {}) {
  const now = Date.now();
  const rows = await supabaseRequest(
    `contact_rate_limits?ip_hash=eq.${encodeURIComponent(ipHash)}&select=ip_hash,window_started_at,request_count&limit=1`,
    { method: "GET" },
  );
  const row = Array.isArray(rows) ? rows[0] : null;

  if (!row) {
    await supabaseRequest("contact_rate_limits", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        ip_hash: ipHash,
        window_started_at: new Date(now).toISOString(),
        request_count: 1,
        updated_at: new Date(now).toISOString(),
      }),
    });
    return false;
  }

  const started = new Date(row.window_started_at).getTime();
  if (!Number.isFinite(started) || now - started >= windowMs) {
    await supabaseRequest(`contact_rate_limits?ip_hash=eq.${encodeURIComponent(ipHash)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        window_started_at: new Date(now).toISOString(),
        request_count: 1,
        updated_at: new Date(now).toISOString(),
      }),
    });
    return false;
  }

  if (Number(row.request_count) >= maxRequests) return true;

  await supabaseRequest(`contact_rate_limits?ip_hash=eq.${encodeURIComponent(ipHash)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      request_count: Number(row.request_count) + 1,
      updated_at: new Date(now).toISOString(),
    }),
  });

  return false;
}

export async function checkAdminLoginRateLimit(ipHash, { windowMs = 15 * 60 * 1000, maxRequests = 10 } = {}) {
  const now = Date.now();
  const rows = await supabaseRequest(
    `admin_login_rate_limits?ip_hash=eq.${encodeURIComponent(ipHash)}&select=ip_hash,window_started_at,request_count&limit=1`,
    { method: "GET" },
  );
  const row = Array.isArray(rows) ? rows[0] : null;

  if (!row) {
    await supabaseRequest("admin_login_rate_limits", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        ip_hash: ipHash,
        window_started_at: new Date(now).toISOString(),
        request_count: 1,
        updated_at: new Date(now).toISOString(),
      }),
    });
    return false;
  }

  const started = new Date(row.window_started_at).getTime();
  if (!Number.isFinite(started) || now - started >= windowMs) {
    await supabaseRequest(`admin_login_rate_limits?ip_hash=eq.${encodeURIComponent(ipHash)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        window_started_at: new Date(now).toISOString(),
        request_count: 1,
        updated_at: new Date(now).toISOString(),
      }),
    });
    return false;
  }

  if (Number(row.request_count) >= maxRequests) return true;

  await supabaseRequest(`admin_login_rate_limits?ip_hash=eq.${encodeURIComponent(ipHash)}`, {
    method: "PATCH",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      request_count: Number(row.request_count) + 1,
      updated_at: new Date(now).toISOString(),
    }),
  });

  return false;
}
