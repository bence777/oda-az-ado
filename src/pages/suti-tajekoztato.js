import { Box, Button, Text } from "@chakra-ui/react";
import LegalPage, { LegalSection } from "../components/legal/LegalPage";
import { openCookieSettings } from "../lib/cookieConsent";

export default function CookieNoticePage() {
  return (
    <LegalPage
      title="Süti tájékoztató"
      description="A weboldal által használt szükséges és statisztikai tárolási technológiák, azok célja és a hozzájárulás kezelésének módja."
      canonicalPath="/suti-tajekoztato"
    >
      <LegalSection title="1. Hogyan használunk sütiket és helyi tárolást?">
        <Text>A weboldal technikailag szükséges helyi tárolást, valamint – kizárólag hozzájárulás esetén – statisztikai sütiket használ. A szükséges megoldások nélkülözhetetlenek a kiválasztott adatvédelmi beállítás megjegyzéséhez és nem szolgálnak marketingcélt.</Text>
        <Text>A statisztikai mérés alapértelmezetten ki van kapcsolva. Ha nem engedélyezi, a Google Analytics nem töltődik be.</Text>
      </LegalSection>

      <LegalSection title="2. Szükséges tárolás">
        <Text><strong>odaazado_cookie_consent_v1</strong> – böngésző helyi tárhelyében (localStorage) tárolt beállítás. Azt jegyzi meg, hogy engedélyezte vagy elutasította-e a statisztikai mérést, valamint a döntés időpontját és a beállítás verzióját.</Text>
        <Text>A választást legfeljebb 180 napig vesszük figyelembe, ezt követően a weboldal ismét rákérdezhet. A helyi tárolás böngészőből bármikor törölhető.</Text>
      </LegalSection>

      <LegalSection title="3. Google Analytics – statisztika">
        <Text>Ha Ön engedélyezi a statisztikai mérést, a weboldal betölti a Google Analytics szolgáltatást. A mérés célja annak megértése, hogy mely oldalak és funkciók hasznosak, illetve hogyan teljesít a weboldal.</Text>
        <Text>A Google Analytics jellemzően <strong>_ga</strong> és <strong>_ga_&lt;azonosító&gt;</strong> nevű első fél sütiket használ a látogatók és munkamenetek megkülönböztetésére. A jelen weboldal a statisztikai sütik élettartamát körülbelül 13 hónapra korlátozza, és nem hosszabbítja meg automatikusan minden oldalbetöltéskor.</Text>
        <Text>A Google-jelek és a hirdetési személyre szabás technikailag ki vannak kapcsolva ebben az integrációban. A weboldal nem használ Google Ads célú sütiket.</Text>
      </LegalSection>

      <LegalSection title="4. Hozzájárulás megadása és visszavonása">
        <Text>Az „Összes elfogadása” gomb engedélyezi a statisztikai mérést. A „Csak szükséges” választás mellett kizárólag a weboldal működéséhez szükséges tárolást használjuk.</Text>
        <Text>A hozzájárulás visszavonása ugyanolyan egyszerű, mint a megadása: a „Süti beállítások” lehetőséggel bármikor módosítható. A statisztika kikapcsolásakor a weboldal megkísérli a saját domainhez tartozó Google Analytics sütik törlését is.</Text>
        <Box mt={5}>
          <Button type="button" onClick={openCookieSettings} h="42px" px={5} borderRadius="10px" bg="#111827" color="#fff" fontSize="11px" _hover={{ bg: "#1F2937" }}>
            Süti beállítások megnyitása
          </Button>
        </Box>
      </LegalSection>

      <LegalSection title="5. Böngészőbeállítások">
        <Text>A sütik és helyi tárolási adatok a böngésző beállításaiban is törölhetők vagy korlátozhatók. Ennek módja böngészőnként eltér. A szükséges technológiák teljes tiltása egyes funkciók működését befolyásolhatja.</Text>
      </LegalSection>

      <LegalSection title="6. Kapcsolódó adatkezelés">
        <Text>A statisztikai méréshez és a weboldalon megadott személyes adatok kezeléséhez kapcsolódó részletes információ az <a href="/adatkezelesi-tajekoztato">Adatkezelési tájékoztatóban</a> található.</Text>
      </LegalSection>
    </LegalPage>
  );
}
