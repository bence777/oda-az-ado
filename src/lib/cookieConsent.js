export const COOKIE_CONSENT_KEY = "odaazado_cookie_consent_v1";
export const LEGACY_ANALYTICS_KEY = "odaazado_analytics_consent";
export const COOKIE_SETTINGS_EVENT = "odaazado:open-cookie-settings";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

export function readCookieConsent() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const decidedAt = parsed?.decidedAt ? new Date(parsed.decidedAt).getTime() : 0;
      const stillValid = decidedAt && Date.now() - decidedAt < COOKIE_CONSENT_MAX_AGE_MS;
      if (parsed?.version === COOKIE_CONSENT_VERSION && typeof parsed?.analytics === "boolean" && stillValid) {
        return parsed;
      }
      window.localStorage.removeItem(COOKIE_CONSENT_KEY);
    }

    const legacy = window.localStorage.getItem(LEGACY_ANALYTICS_KEY);
    if (legacy === "granted" || legacy === "denied") {
      const migrated = {
        version: COOKIE_CONSENT_VERSION,
        necessary: true,
        analytics: legacy === "granted",
        decidedAt: new Date().toISOString(),
      };
      window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(migrated));
      window.localStorage.removeItem(LEGACY_ANALYTICS_KEY);
      return migrated;
    }
  } catch {
    return null;
  }

  return null;
}

export function saveCookieConsent({ analytics }) {
  if (typeof window === "undefined") return null;
  const value = {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: Boolean(analytics),
    decidedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(value));
  return value;
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT));
}
