import FaqAccordionSection from "../ui/FaqAccordionSection";
import design from "../../design/system";
import { serviceFaqs } from "../../data/serviceFaqs";

export default function ServiceFaqSection({ slug }) {
  const items = serviceFaqs[slug] || [];
  if (!items.length) return null;

  return (
    <FaqAccordionSection
      items={items}
      title="Amit érdemes még az első egyeztetés előtt tudni."
      intro="Rövid válaszok a szolgáltatással kapcsolatban leggyakrabban felmerülő gyakorlati kérdésekre."
      bg={design.colors.white}
    />
  );
}
