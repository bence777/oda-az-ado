import FaqAccordionSection from "../ui/FaqAccordionSection";
import design from "../../design/system";

export const contactFaqItems = [
  [
    "Milyen adatokat kell megadnom az első üzenetben?",
    "A név, e-mail cím és néhány mondatos leírás elegendő. A cégnév, telefonszám és a téma megjelölése segíthet, de nem kötelező.",
  ],
  [
    "Van nyilvános árlista?",
    "Nem. A könyvelési díj a vállalkozás működésétől és a szükséges feladatoktól függ, ezért a részletek rövid áttekintése után egyedi ajánlat készül.",
  ],
  [
    "Hol lehet személyesen egyeztetni?",
    "Debrecenben személyes egyeztetésre is van lehetőség. Budapesti és országos ügyfelekkel az együttműködés online, digitális dokumentumkezeléssel és folyamatos kapcsolattartással is kialakítható.",
  ],
  [
    "Könyvelőváltással is kereshetem Önöket?",
    "Igen. A könyvelőváltás külön folyamatként kezelhető a jelenlegi helyzet áttekintésétől az átadás-átvételen át az új működés kialakításáig.",
  ],
];

export default function ContactFaqSection() {
  return (
    <FaqAccordionSection
      items={contactFaqItems}
      title="Mielőtt ír."
      intro="Az első kapcsolatfelvételhez nem kell előre minden adatot összeszedni. Elég, ha röviden leírja, milyen helyzetben keres könyvelőt vagy tanácsadót."
      bg={design.colors.white}
    />
  );
}
