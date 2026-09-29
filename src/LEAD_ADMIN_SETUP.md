# ODA-AZ-ADÓ leadkezelő – beüzemelés

## 1. Függőség

A projekt gyökerében:

```bash
npm install nodemailer
```

## 2. Supabase

A Supabase SQL Editorban futtasd le teljes egészében:

`src/database/lead_management.sql`

A script új projekten és a korábbi leadkezelő schema frissítéseként is futtatható.

## 3. Vercel / .env.local

Kötelező:

```env
SUPABASE_URL=https://PROJECT_REF.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...

ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=legalább-32-karakteres-random-secret
CONTACT_RATE_LIMIT_SECRET=külön-hosszú-random-secret
```

SMTP értesítéshez:

```env
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_SECURE=false
SMTP_FROM_NAME=ODA-AZ-ADÓ weboldal
SMTP_FROM_EMAIL=
CONTACT_NOTIFICATION_EMAIL=
ADMIN_PUBLIC_URL=https://odaazado.hu
```

Megjegyzések:

- Port 465 esetén `SMTP_SECURE=true`.
- Port 587 esetén `SMTP_SECURE=false`; a Nodemailer STARTTLS-t használ, ha a szerver támogatja.
- `SMTP_FROM_EMAIL` opcionális; ha üres, az `SMTP_USER` lesz a feladó.
- `ADMIN_PUBLIC_URL` opcionális, de ha megadod, az értesítő levél közvetlen admin-linket tartalmaz.
- A `SUPABASE_SECRET_KEY`, `SMTP_PASSWORD`, `ADMIN_PASSWORD` és session secret soha ne kerüljön `NEXT_PUBLIC_` változóba vagy Gitbe.

## 4. Teszt

1. Redeploy / `npm run dev`.
2. Küldj be teszt ajánlatkérést a `/kapcsolat` oldalon.
3. Supabase `leads` táblában jelenjen meg a rekord.
4. `/admin/login` → belépés.
5. Ellenőrizd a leadet, válts státuszt, ments belső megjegyzést.
6. SMTP beállítás után ellenőrizd az automatikus e-mailt.
7. Az adminban az e-mail állapotának `E-mail elküldve` értékre kell váltania.
8. Próbáld ki az `E-mail újraküldése` gombot is.

## 5. Adatfolyam

`kapcsolat űrlap → Next.js API → rate limit → Supabase mentés → audit esemény → SMTP értesítés`

Az SMTP-hiba nem dobja el a leadet. A rekord megmarad az adatbázisban, a sikertelen e-mail pedig látható az adminfelületen és később újraküldhető.
