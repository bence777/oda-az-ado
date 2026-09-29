import crypto from "crypto";

const COOKIE_NAME = "oda_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return secret;
}

function sign(payload) {
  const secret = getSecret();
  if (!secret) return null;
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export function adminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && getSecret());
}

export function verifyAdminPassword(password) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== "string") return false;
  return safeEqual(password, expected);
}

export function createAdminSessionCookie() {
  const issuedAt = Date.now();
  const payload = Buffer.from(JSON.stringify({ issuedAt })).toString("base64url");
  const signature = sign(payload);
  if (!signature) throw new Error("ADMIN_SESSION_SECRET is missing or too short.");

  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${payload}.${signature}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}${secure}`;
}

export function clearAdminSessionCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`;
}

function readCookie(cookieHeader, name) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

export function isAdminRequest(req) {
  const token = readCookie(req?.headers?.cookie || "", COOKIE_NAME);
  if (!token || !getSecret()) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  if (!expected || !safeEqual(signature, expected)) return false;

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    const issuedAt = Number(decoded.issuedAt);
    return Number.isFinite(issuedAt) && Date.now() - issuedAt >= 0 && Date.now() - issuedAt <= SESSION_TTL_MS;
  } catch {
    return false;
  }
}
