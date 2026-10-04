import { NextResponse } from "next/server";
import { canonicalHost, legacyRedirects } from "./data/seoMigration";

function normalizedPath(pathname) {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function proxy(request) {
  const incoming = request.nextUrl;
  const pathname = normalizedPath(incoming.pathname);
  const legacyDestination = legacyRedirects[pathname];
  const needsCanonicalHost = incoming.hostname === "odaazado.hu";

  if (!legacyDestination && !needsCanonicalHost) {
    return NextResponse.next();
  }

  const destination = incoming.clone();

  if (needsCanonicalHost) {
    destination.hostname = canonicalHost;
    destination.protocol = "https:";
    destination.port = "";
  }

  if (legacyDestination) {
    const [targetPath, fragment] = legacyDestination.split("#");
    destination.pathname = targetPath;
    destination.hash = fragment ? `#${fragment}` : "";
  }

  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: [
    "/irodank/:path*",
    "/araink/:path*",
    "/szolgaltatasok/adotanacsadas/:path*",
    "/szolgaltatasok/berelszamolas/:path*",
    "/szolgaltatasok/szja-bevallas-keszitese/:path*",
    "/szolgaltatasok/hatosag-elotti-kepviselet/:path*",
    "/szolgaltatasok/szabalyzatkeszites/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
