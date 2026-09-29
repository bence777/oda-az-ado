/**
 * Legacy URL mapping for the 2026 ODA-AZ-ADÓ site migration.
 *
 * Keep these redirects in place for at least a year after launch; ideally
 * indefinitely, because old search results and external links may keep using
 * these URLs for much longer.
 */
export const legacyRedirects = {
  "/irodank": "/rolunk",
  "/araink": "/kapcsolat",
  "/szolgaltatasok/adotanacsadas": "/adotanacsadas",
  "/szolgaltatasok/berelszamolas": "/berszamfejtes",
  "/szolgaltatasok/szja-bevallas-keszitese": "/szolgaltatasok#szja-bevallas",
  "/szolgaltatasok/hatosag-elotti-kepviselet": "/szolgaltatasok#hatosagi-kepviselet",
  "/szolgaltatasok/szabalyzatkeszites": "/szolgaltatasok#szabalyzatkeszites",
};

export const canonicalHost = "www.odaazado.hu";
