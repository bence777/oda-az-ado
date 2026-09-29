import { Text } from "@chakra-ui/react";
import LegalPage, { LegalSection } from "../components/legal/LegalPage";
import { company, offices } from "../data/contact";

export default function PrivacyNoticePage() {
  return (
    <LegalPage
      title="Adatkezelési tájékoztató"
      description="Tájékoztatás arról, hogyan kezeli az ODA-AZ-ADÓ a weboldalon megadott személyes adatokat, milyen célból és milyen jogok illetik meg az érintetteket."
      canonicalPath="/adatkezelesi-tajekoztato"
    >
      <LegalSection title="1. Az adatkezelő">
        <Text><strong>{company.legalName}</strong></Text>
        <Text>Székhely: {company.registeredOffice}</Text>
        <Text>Cégjegyzékszám: {company.companyRegistrationNumber}</Text>
        <Text>Adószám: {company.taxId}</Text>
        <Text>E-mail: <a href={`mailto:${offices.debrecen.email}`}>{offices.debrecen.email}</a></Text>
        <Text>Telefon: <a href={`tel:${offices.debrecen.phoneHref}`}>{offices.debrecen.phone}</a></Text>
      </LegalSection>

      <LegalSection title="2. Ajánlatkérés és kapcsolatfelvétel">
        <Text>A kapcsolatfelvételi űrlapon megadott adatokat kizárólag a megkeresés megválaszolásához, az igény előzetes felméréséhez, ajánlat előkészítéséhez és a kapcsolattartáshoz használjuk.</Text>
        <Text>Kezelt adatok lehetnek: név, cégnév, e-mail-cím, telefonszám, adószám, a vállalkozás működésére vonatkozó, az ajánlat elkészítéséhez szükséges adatok, valamint az üzenet tartalma.</Text>
        <Text>Az adatkezelés jogalapja az érintett kérésére történő, szerződéskötést megelőző lépések megtétele (GDPR 6. cikk (1) b)). Ha a kapcsolatot egy vállalkozás képviselője vagy kapcsolattartója kezdeményezi, a kapcsolattartási adatok kezelése az adatkezelő és a megkereső vállalkozás jogos érdekén is alapulhat (GDPR 6. cikk (1) f)).</Text>
        <Text>Az adatok megőrzése az ajánlatkérés kezeléséhez és lezárásához szükséges ideig történik. Ha szerződés jön létre, a további adatkezelésre a szerződés teljesítésére, illetve a számviteli és egyéb jogi kötelezettségekre vonatkozó megőrzési szabályok alkalmazandók.</Text>
      </LegalSection>

      <LegalSection title="3. Technikai és biztonsági adatok">
        <Text>A weboldal és az ajánlatkérő biztonságos működése érdekében technikai adatokat kezelhetünk, például a böngésző azonosítóját és visszaélés-megelőzési célból az IP-cím egyirányú, titkos kulccsal képzett lenyomatát.</Text>
        <Text>Ennek célja a spam, automatizált visszaélés, túlzott lekérések és biztonsági események megelőzése. Jogalapja a weboldal és az adatkezelés biztonságához fűződő jogos érdek (GDPR 6. cikk (1) f)).</Text>
      </LegalSection>

      <LegalSection title="4. Webanalitika">
        <Text>A Google Analytics statisztikai szolgáltatást kizárólag az Ön előzetes hozzájárulása után kapcsoljuk be. Elutasítás esetén a weboldal alapfunkciói változatlanul használhatók.</Text>
        <Text>A hozzájárulás jogalapja a GDPR 6. cikk (1) a). A döntés bármikor visszavonható a weboldal láblécében található „Süti beállítások” hivatkozással. A visszavonás a korábbi adatkezelés jogszerűségét nem érinti.</Text>
      </LegalSection>

      <LegalSection title="5. Adatfeldolgozók és szolgáltatók">
        <Text>A weboldal működtetéséhez az adatkezelő technikai szolgáltatókat vehet igénybe, különösen tárhely-, adatbázis-, e-mail- és analitikai szolgáltatókat. A jelenlegi technikai rendszerben ide tartozhat a Vercel (webes infrastruktúra), a Supabase (adatbázis), a levelezési szolgáltató, valamint hozzájárulás esetén a Google Analytics.</Text>
        <Text>E szolgáltatók kizárólag a szolgáltatás nyújtásához szükséges mértékben kezelhetnek adatot, a rájuk irányadó szerződéses és adatvédelmi feltételek szerint. Ha adattovábbítás az Európai Gazdasági Térségen kívülre történik, az adatkezelő a GDPR szerinti megfelelő garanciák alkalmazására törekszik.</Text>
      </LegalSection>

      <LegalSection title="6. Kik férhetnek hozzá az adatokhoz?">
        <Text>A személyes adatokhoz kizárólag azok a munkatársak és közreműködők férhetnek hozzá, akiknek ez a megkeresés kezelése, az ajánlatadás, az üzemeltetés vagy a biztonság fenntartása érdekében szükséges. A leadkezelő adminfelülete nem nyilvános.</Text>
      </LegalSection>

      <LegalSection title="7. Az érintett jogai">
        <Text>Az érintett a GDPR feltételei szerint kérhet tájékoztatást és hozzáférést a személyes adataihoz, kérheti azok helyesbítését vagy törlését, az adatkezelés korlátozását, tiltakozhat a jogos érdeken alapuló adatkezelés ellen, illetve ahol alkalmazható, élhet az adathordozhatósághoz való jogával.</Text>
        <Text>Hozzájáruláson alapuló adatkezelés esetén a hozzájárulás bármikor visszavonható. Az adatvédelmi kérelmek a <a href={`mailto:${offices.debrecen.email}`}>{offices.debrecen.email}</a> címen nyújthatók be.</Text>
      </LegalSection>

      <LegalSection title="8. Panasz és jogorvoslat">
        <Text>Ha úgy gondolja, hogy személyes adatainak kezelése jogsértő, panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH).</Text>
        <Text>NAIH: 1055 Budapest, Falk Miksa utca 9–11.; levelezési cím: 1363 Budapest, Pf. 9.; e-mail: <a href="mailto:ugyfelszolgalat@naih.hu">ugyfelszolgalat@naih.hu</a>; telefon: +36 1 391 1400.</Text>
        <Text>Az érintett bírósághoz is fordulhat a GDPR és a vonatkozó magyar jogszabályok szerint.</Text>
      </LegalSection>

      <LegalSection title="9. Automatizált döntéshozatal">
        <Text>A weboldalon beküldött ajánlatkérések alapján nem történik kizárólag automatizált döntéshozatal vagy olyan profilalkotás, amely az érintettre nézve joghatással vagy hasonlóan jelentős hatással járna. A lead státuszait a belső adminfelületen kezeljük.</Text>
      </LegalSection>

      <LegalSection title="10. A tájékoztató módosítása">
        <Text>A tájékoztató a szolgáltatások, az alkalmazott technológiák vagy a jogi követelmények változásakor frissülhet. A mindenkor hatályos változat ezen az oldalon érhető el.</Text>
      </LegalSection>
    </LegalPage>
  );
}
