import FaqAccordionSection from "../ui/FaqAccordionSection";
import design from "../../design/system";

export const locationFaqItems = [
  [
    "Van személyes iroda Debrecenben?",
    "Igen. A debreceni iroda címe 4026 Debrecen, Csokonai utca 4. 3/7., 7. kapucsengő. Személyes egyeztetésre előzetes kapcsolatfelvétel után van lehetőség.",
  ],
  [
    "Van budapesti iroda?",
    "Budapesti ügyfelekkel online együttműködésben dolgozunk, digitális dokumentumkezeléssel és folyamatos szakmai kapcsolattartással. Budapesten jelenleg nem jelölünk meg személyes irodát.",
  ],
  [
    "Más városból is lehet ügyfélként csatlakozni?",
    "Igen. Az országos együttműködés digitális dokumentumkezelésre és online kapcsolattartásra épül, ezért a könyvelési folyamat helytől függetlenül kialakítható.",
  ],
  [
    "Szükséges rendszeresen személyesen iratot vinni?",
    "Online együttműködésnél nem ez a működés alapja. A szükséges dokumentumok rendezett digitális csatornán is átadhatók, a személyes találkozó pedig akkor használható, amikor valóban indokolt.",
  ],
];

export default function LocationsFaqSection() {
  return (
    <FaqAccordionSection
      items={locationFaqItems}
      title="Személyesen vagy online?"
      intro="A helyszín nem változtatja meg a szakmai folyamatot. A különbség elsősorban abban van, hogyan történik az egyeztetés és a dokumentumok átadása."
      bg={design.colors.offWhite}
    />
  );
}
