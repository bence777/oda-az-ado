import ServiceDetailPage from "@/components/service-detail/ServiceDetailPage";

const service = {
  slug: "konyvelovaltas",
  number: "→",
  name: "Könyvelőváltás",
  eyebrow: "Rendezett átadás-átvétel",
  title: "Könyvelőváltáson gondolkodik?",
  description:
    "A könyvelőváltás akkor működik jól, ha az átadás-átvétel nem kapkodás, hanem előre felépített folyamat. A jelenlegi helyzet áttekintésétől az új rendszerre való átállásig.",
  locations: "Debrecen · Budapest · online országosan",
  promiseTitle: "A váltás célja nem az, hogy mindent újrakezdjünk.",
  promiseText:
    "Először azt kell látni, mi van rendben, mi hiányzik, milyen dokumentumokra lesz szükség, és milyen feladatokat kell lezárni az átadás előtt.",
  scopeEyebrow: "A váltás részei",
  scopeTitle: "A szükséges információk rendezése még az átállás előtt.",
  scopeIntro:
    "A pontos feladatlista vállalkozásonként eltér, de a cél minden esetben ugyanaz: az előző időszak lezárása és az új könyvelési folyamat tiszta indulása.",
  scope: [
    { title: "Jelenlegi helyzet áttekintése", text: "Áttekintjük a vállalkozás működését, adózási helyzetét és a könyvelés jelenlegi kereteit." },
    { title: "Dokumentumlista", text: "Meghatározzuk, milyen könyvelési, analitikai és egyéb anyagokra lesz szükség az átadás során." },
    { title: "Átadás-átvétel", text: "A dokumentumok és nyilvántartások átvétele rendezett, ellenőrizhető módon történik." },
    { title: "Ellenőrzés", text: "Az átvett anyagokat áttekintjük, és azonosítjuk az esetleges hiányokat vagy tisztázandó kérdéseket." },
    { title: "Új működési rend", text: "Kialakítjuk a dokumentumküldés, kapcsolattartás és havi feldolgozás új menetét." },
    { title: "Folyamatos könyvelés", text: "Az átállás után a vállalkozás a megszokott havi könyvelési folyamatba kerül." },
  ],
  processEyebrow: "6 lépés",
  processTitle: "Átállás, amelynek minden pontja követhető.",
  processText: "A folyamat célja, hogy a váltás előtt és után is egyértelmű legyen, hol tart az átadás.",
  process: [
    { label: "01", title: "Egyeztetés", text: "Röviden átbeszéljük a vállalkozás helyzetét és a váltás tervezett időpontját." },
    { label: "02", title: "Helyzetfelmérés", text: "Áttekintjük a jelenlegi könyvelési és adózási helyzetet." },
    { label: "03", title: "Dokumentumok meghatározása", text: "Összeállítjuk az átadáshoz szükséges dokumentumok és nyilvántartások körét." },
    { label: "04", title: "Átadás-átvétel", text: "A szükséges anyagok rendezett átvétele megtörténik." },
    { label: "05", title: "Ellenőrzés", text: "Az átvett háttér ellenőrzése után tisztázzuk a nyitott kérdéseket." },
    { label: "06", title: "Átállás", text: "Elindul az új dokumentumkezelési és könyvelési folyamat." },
  ],
  insightEyebrow: "Mikor érdemes elkezdeni",
  insightTitle: "A könyvelőváltást nem érdemes az utolsó napokra hagyni.",
  insightText:
    "Minél hamarabb tisztázott az átadás időpontja és a szükséges dokumentumok köre, annál több idő marad az esetleges hiányok rendezésére és az új működés kialakítására.",
  insightItems: ["váltás tervezett időpontja", "átadandó dokumentumok", "nyitott könyvelési kérdések", "új dokumentumkezelési folyamat"],
  trustItems: [
    { title: "Folyamatban gondolkodva", text: "A váltás nem egyetlen fájlátadás, hanem egymásra épülő ellenőrzési és átállási lépések sora." },
    { title: "Könyvelés + adózás", text: "Az áttekintés nem csak technikai, hanem a vállalkozás adózási és könyvelési helyzetére is kiterjedhet." },
  ],
  fitTitle: "Mikor aktuális a könyvelőváltás?",
  fit: [
    "Ha új könyvelővel szeretne dolgozni, és rendezett átadást szeretne.",
    "Ha a jelenlegi folyamat nehezen követhető vagy kevés visszajelzést ad.",
    "Ha a vállalkozás növekedése miatt több vezetői információra és szakmai egyeztetésre van szükség.",
    "Ha digitálisabb, rendezettebb dokumentumkezelésre szeretne átállni.",
  ],
  ctaTitle: "Beszéljünk a könyvelőváltásról.",
  ctaText: "Az első egyeztetésen áttekintjük a váltás tervezett időpontját, a jelenlegi helyzetet és az átadáshoz szükséges következő lépéseket.",
  seoTitle: "Könyvelőváltás vállalkozásoknak | Oda-Az-Adó",
  seoDescription: "Könyvelőváltás rendezett átadás-átvétellel: egyeztetés, helyzetfelmérés, dokumentumok átvétele, nyitóállapot-ellenőrzés és átállás.",
};

export default function AccountantSwitchPage() {
  return <ServiceDetailPage service={service} />;
}
