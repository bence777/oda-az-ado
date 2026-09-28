import FaqAccordionSection from "../ui/FaqAccordionSection";
import design from "../../design/system";

export const servicesFaqItems = [
  [
    "Milyen könyvelési szolgáltatásokat nyújt az Oda-Az-Adó?",
    "A fő szolgáltatási területek a teljes körű könyvelés, az adótanácsadás, a bérszámfejtés és a vezetői információ. Ezekhez kapcsolódhat hatóság előtti képviselet, szabályzatkészítés és egyéb szakmai feladat is.",
  ],
  [
    "A szolgáltatások külön is igénybe vehetők?",
    "A pontos szolgáltatási kör vállalkozásonként eltérhet. Az oldal azért mutatja be külön a területeket, hogy látható legyen, mely feladatok kapcsolódhatnak az együttműködéshez; az ajánlat mindig a tényleges igények alapján készül.",
  ],
  [
    "Van lehetőség online könyvelésre?",
    "Igen. A könyvelési együttműködés digitális dokumentumkezelésre és online kapcsolattartásra is épülhet, így budapesti és országos ügyfelekkel is kialakítható rendezett online folyamat.",
  ],
  [
    "Van nyilvános árlista vagy csomagár?",
    "Nem. A könyvelési díj a vállalkozás működésétől és a szükséges feladatoktól függ, ezért a részletek áttekintése után egyedi ajánlat készül.",
  ],
];

export default function ServicesFaqSection() {
  return (
    <FaqAccordionSection
      items={servicesFaqItems}
      title="Mielőtt szolgáltatást választ."
      intro="A szolgáltatások külön oldalon szerepelnek, de a gyakorlatban egymásra épülhetnek. Az együttműködés mindig a vállalkozás tényleges működéséhez igazodik."
      bg={design.colors.white}
    />
  );
}
