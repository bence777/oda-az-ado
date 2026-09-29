# GDPR / cookie beüzemelés

## Ami technikailag elkészült

- Google Analytics csak előzetes statisztikai hozzájárulás után töltődik be.
- „Összes elfogadása”, „Csak szükséges” és részletes beállítások.
- A döntés localStorage-ban, verzióval és időponttal tárolódik, legfeljebb 180 napig.
- A hozzájárulás bármikor módosítható a footer „Süti beállítások” gombjával.
- Statisztika kikapcsolásakor a rendszer letiltja a GA mérést és megkísérli a GA-cookie-k törlését.
- Google signals és hirdetési személyre szabás kikapcsolva.
- GA-cookie élettartam kb. 13 hónap, cookie_update=false.
- Külső Google Fonts runtime kérés megszüntetve; a betűtípus Next.js build-time fontkezelést használ.
- /adatkezelesi-tajekoztato és /suti-tajekoztato oldalak.
- Footer jogi linkek és süti-beállítások.
- Az ajánlatkérő checkbox már nem „hozzájárulásként” kezeli a szerződés előtti kapcsolatfelvételt, hanem az adatkezelési tájékoztató tudomásulvételét kéri.

## Indulás előtt ellenőrizendő

1. `NEXT_PUBLIC_GA_MEASUREMENT_ID` valóban a megfelelő ODA-AZ-ADÓ GA4 property legyen.
2. Az adatkezelési tájékoztatóban felsorolt technikai szolgáltatók egyezzenek a tényleges szolgáltatókkal.
3. Az SMTP/e-mail szolgáltató véglegesítése után érdemes név szerint feltüntetni, ha adatfeldolgozóként személyes adatot kezel.
4. Ha van külön adatvédelmi tisztviselő vagy adatvédelmi kapcsolattartó, annak adatait fel kell venni.
5. A belső lead-megőrzési gyakorlatot véglegesítsék, és ha konkrét megőrzési időt határoznak meg, a tájékoztatót pontosítani kell.
6. Éles domainen böngésző DevTools > Network / Application alatt ellenőrizni: elutasítás előtt ne legyen `google-analytics.com` / `googletagmanager.com` kérés és `_ga` cookie.

A jogi oldalak technikai és tartalmi kiindulópontok. Éles indulás előtt a vállalkozás tényleges adatkezelési gyakorlatával és szerződött szolgáltatóival össze kell vetni őket.
