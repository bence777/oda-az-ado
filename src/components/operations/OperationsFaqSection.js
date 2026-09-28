import FaqAccordionSection from "../ui/FaqAccordionSection";
import design from "../../design/system";

export const operationsFaqItems = [
  [
    "Mit jelent a digitális dokumentumkezelés?",
    "A cél, hogy a könyveléshez szükséges anyagok rendezett, visszakereshető módon érkezzenek be és kapcsolódjanak a feldolgozási folyamathoz. Nem önálló technológiai termékről, hanem a könyvelési együttműködés szervezéséről van szó.",
  ],
  [
    "Kapok visszajelzést arról, hol tart a feldolgozás?",
    "A működés célja a követhetőbb státusz és az időben kommunikált kötelezettségek. A pontos kommunikációs ritmus és csatorna az együttműködés kereteihez igazítható.",
  ],
  [
    "Milyen vezetői információ készülhet a könyvelésből?",
    "Igény szerint havi vagy negyedéves összefoglaló készülhet, amely többek között főkönyvi adatokat, adófolyószámla-információt, előzetes adókalkulációt és a várható eredményt foglalhatja össze.",
  ],
  [
    "Online együttműködésnél is működik ez a folyamat?",
    "Igen. Az online együttműködés digitális dokumentumkezelésre és folyamatos kapcsolattartásra épül, miközben Debrecenben személyes egyeztetésre is van lehetőség.",
  ],
];

export default function OperationsFaqSection() {
  return (
    <FaqAccordionSection
      items={operationsFaqItems}
      title="Hogyan néz ki mindez a gyakorlatban?"
      intro="A rendszer nem plusz adminisztrációt jelent. A cél az, hogy a könyvelési folyamatból kevesebb bizonytalanság és több használható visszajelzés legyen."
      bg={design.colors.offWhite}
    />
  );
}
