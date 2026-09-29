import ServiceDetailPage from "@/components/service-detail/ServiceDetailPage";

const service = {
  slug: "konyveles-budapest",
  number: "BP",
  name: "Könyvelés Budapest",
  eyebrow: "Budapesti vállalkozásoknak",
  title: "Könyvelés Budapesten, átlátható rendszerben.",
  description:
    "Teljes körű könyvelési háttér budapesti vállalkozásoknak digitális dokumentumkezeléssel, folyamatos kapcsolattartással, adótanácsadással és vezetői információval.",
  locations: "Budapest · online együttműködés",
  promiseTitle: "Nem a távolságot kell kezelni, hanem a folyamatot.",
  promiseText:
    "A budapesti együttműködés digitális dokumentumkezelésre és rendszeres online kapcsolattartásra épül. A cél ugyanaz: követhető feldolgozás, időben jelzett kötelezettségek és visszakereshető könyvelési háttér.",
  scopeEyebrow: "Mit fog össze",
  scopeTitle: "A könyveléstől a vezetői tájékoztatásig.",
  scopeIntro:
    "A szolgáltatás nem egyetlen havi feladatból áll. A könyvelés, az adózási kérdések, a bérszámfejtés és a vezetői információ egymásra épülő rendszerként kezelhető.",
  scope: [
    { title: "Teljes körű könyvelés", text: "A gazdasági események és bizonylatok folyamatos, strukturált feldolgozása." },
    { title: "Digitális dokumentumkezelés", text: "A dokumentumok rendezett beérkezése, feldolgozása és visszakereshetősége." },
    { title: "Adótanácsadás", text: "Előzetes kalkulációk és adózási kérdések szakmai áttekintése a döntések előtt." },
    { title: "Bérszámfejtés", text: "A foglalkoztatáshoz kapcsolódó számfejtési, nyilvántartási és havi bevallási feladatok." },
    { title: "Vezetői információ", text: "Igény szerint havi vagy negyedéves összefoglalók az eredményről és várható adóterhekről." },
    { title: "Könyvelőváltás", text: "A meglévő könyvelési háttér áttekintése és az átadás-átvétel rendezett megszervezése." },
  ],
  processEyebrow: "Online működés",
  processTitle: "Követhető folyamat személyes irathordás nélkül.",
  processText:
    "A digitalizáció célja nem önmagában a technológia, hanem az, hogy kevesebb adminisztrációval is rendezett és ellenőrizhető maradjon a könyvelési folyamat.",
  process: [
    { label: "01", title: "Dokumentumok beérkezése", text: "A szükséges anyagok digitálisan, strukturált formában érkeznek be." },
    { label: "02", title: "Ellenőrzés és feldolgozás", text: "A dokumentumokat feldolgozzuk, ellenőrizzük és szükség esetén NAV-adatokkal egyeztetjük." },
    { label: "03", title: "Könyvelés és státusz", text: "A feldolgozás állapota és a fizetendő kötelezettségek követhetővé válnak." },
    { label: "04", title: "Tájékoztatás és archiválás", text: "A lényegi információkról visszajelzés készül, az anyagok pedig visszakereshetően kezelhetők." },
  ],
  insightEyebrow: "Budapest + online",
  insightTitle: "A személyes jelenlét helyett a szakmai elérhetőség számít.",
  insightText:
    "A budapesti ügyfelek kiszolgálása online együttműködésre épül. A dokumentumok, kérdések és vezetői visszajelzések így távolról is rendezett folyamatban kezelhetők.",
  insightItems: [
    "digitális dokumentumkezelés",
    "folyamatos online kapcsolattartás",
    "előzetes adókalkuláció",
    "vezetői riport és döntéstámogatás",
  ],
  trustItems: [
    { title: "15+ év szakmai tapasztalat", text: "2010 óta a vállalkozások pénzügyi hátterén dolgozunk." },
    { title: "Szakmai felelősségbiztosítás", text: "Az iroda szakmai felelősségbiztosítással rendelkezik." },
    { title: "Regisztrált adótanácsadó", text: "Az iroda ügyvezetője regisztrált adótanácsadó." },
  ],
  fitTitle: "Kinek lehet jó budapesti együttműködés?",
  fit: [
    "Olyan vállalkozásoknak, amelyeknek nincs szükségük rendszeres személyes iratátadásra.",
    "Növekvő cégeknek, ahol a könyvelés mellett adótanácsadásra és vezetői információra is szükség van.",
    "Könyvelőváltást tervező vállalkozásoknak, amelyek rendezett digitális átállást keresnek.",
    "Cégvezetőknek, akik elérhető szakmai partnert és érthető pénzügyi visszajelzést szeretnének.",
  ],
  ctaTitle: "Budapesti vállalkozásának keres rendezett könyvelési hátteret?",
  ctaText: "Az első egyeztetésen áttekintjük a vállalkozás működését, a szükséges feladatokat és az online együttműködés kereteit.",
  seoTitle: "Könyvelés Budapest | Online könyvelés | Oda-Az-Adó",
  seoDescription: "Könyvelés budapesti vállalkozásoknak online együttműködéssel, digitális dokumentumkezeléssel, adótanácsadással, bérszámfejtéssel és vezetői információval.",
};

export default function BudapestAccountingPage() {
  return <ServiceDetailPage service={service} />;
}
