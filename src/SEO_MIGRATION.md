# ODA-AZ-ADÓ – SEO migráció / 301 terv

Frissítve: 2026-09-29

## Cél

A régi odaazado.hu URL-ek keresőértékének és külső linkjeinek átvezetése az új weboldal releváns oldalaira. A migráció szerveroldali, permanens HTTP 301 átirányításokat használ.

## Ellenőrzött régi URL-ek és célok

| Régi URL | Új cél | Indok |
| --- | --- | --- |
| `/` | `/` | A főoldal URL-je változatlan. |
| `/konyveles` | `/konyveles` | A könyvelési oldal URL-je változatlan. |
| `/kapcsolat` | `/kapcsolat` | A kapcsolat oldal URL-je változatlan. |
| `/irodank` | `/rolunk` | Az iroda/cég bemutatása az új Rólunk oldalra került. |
| `/araink` | `/kapcsolat` | Az új pozicionálás szerint nincs nyilvános árlista; ajánlatkérés a releváns következő lépés. |
| `/szolgaltatasok/adotanacsadas` | `/adotanacsadas` | Közvetlen, azonos témájú új szolgáltatási oldal. |
| `/szolgaltatasok/berelszamolas` | `/berszamfejtes` | A régi bérelszámolás tartalma az új bérszámfejtési oldalnak felel meg. |
| `/szolgaltatasok/szja-bevallas-keszitese` | `/szolgaltatasok#szja-bevallas` | Az SZJA az új oldalon kapcsolódó szolgáltatásként marad meg. |
| `/szolgaltatasok/hatosag-elotti-kepviselet` | `/szolgaltatasok#hatosagi-kepviselet` | A tartalom az új szolgáltatási összefoglaló releváns blokkjára került. |
| `/szolgaltatasok/szabalyzatkeszites` | `/szolgaltatasok#szabalyzatkeszites` | A tartalom az új szolgáltatási összefoglaló releváns blokkjára került. |

A fragmentek (`#...`) csak a látogatót viszik a megfelelő blokkhoz; a kereső szempontjából a céloldal a `/szolgaltatasok`.

## Technikai megvalósítás

- `src/proxy.js`: Next.js 16 Proxy, amely a régi URL-eket közvetlenül a végleges célra 301-gyel irányítja.
- `src/data/seoMigration.js`: egyetlen központi redirect mapping.
- A korábbi legacy redirect oldalak megmaradnak fallbackként, szintén `statusCode: 301` értékkel.
- `odaazado.hu` → `www.odaazado.hu` 301 canonical host normalizálás.
- A sitemap kizárólag az új, indexelendő URL-eket tartalmazza; legacy redirect URL nincs benne.
- Az új oldalak self-referencing canonical URL-eket használnak.

## Élesítés előtt kötelező ellenőrzés

1. Search Console-ból exportáld az elmúlt 12–16 hónap oldal/URL teljesítményét. Ha ott olyan régi URL látszik, amely nincs a fenti listában, hozzá kell adni a mappinghez.
2. Search Console Links riportban nézd meg, van-e külső link olyan régi URL-re, amely nincs a listában.
3. Az éles domainen ellenőrizd `curl -I` paranccsal minden régi URL-t: egyetlen 301 ugrás után 200-as végleges oldal következzen.
4. Ne legyen redirect chain és ne legyen olyan régi értékes URL, amely a főoldalra esik vissza releváns cél nélkül.
5. Küldd be az új `https://www.odaazado.hu/sitemap.xml` sitemapet Search Console-ban.
6. URL Inspectionnel ellenőrizd legalább a főoldalt, `/konyveles`, `/adotanacsadas`, `/berszamfejtes`, `/konyveles-budapest` és 2–3 régi redirect URL-t.
7. A redirecteket legalább 1 évig, lehetőleg tartósan tartsd meg.

## Élesítés utáni monitorozás

Az első hetekben Search Console-ban figyeld:

- Page indexing / Not found (404)
- Page with redirect
- Duplicate / canonical problémák
- Crawl hibák
- organikus kattintások és megjelenések oldalanként

Új 404 esetén először azt kell eldönteni, volt-e az URL-nek valódi régi tartalma vagy külső linkje. Csak releváns helyettesítő esetén kapjon 301-et; minden ismeretlen URL-t nem szabad automatikusan a főoldalra irányítani.
