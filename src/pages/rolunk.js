import Head from "next/head";
import PageShell from "@/components/layout/PageShell";
import AboutHero from "@/components/about/AboutHero";
import ExperienceSection from "@/components/about/ExperienceSection";
import PositioningSection from "@/components/about/PositioningSection";
import PrinciplesSection from "@/components/about/PrinciplesSection";
import ReachSection from "@/components/about/ReachSection";
import AboutCta from "@/components/about/AboutCta";
import { makeBreadcrumbSchema, organizationSchema } from "@/data/seo";

export default function AboutPage() {
  const breadcrumbs = makeBreadcrumbSchema([{ name: "Kezdőlap", path: "/" }, { name: "Rólunk", path: "/rolunk" }]);
  return (
    <>
      <Head>
        <title>Rólunk | Oda-Az-Adó Könyvelőiroda</title>
        <meta
          name="description"
          content="Több mint 10 év könyvelési és adózási tapasztalat, szakmai felelősségbiztosítás, személyes debreceni jelenlét és online országos együttműködés."
        />
        <link rel="canonical" href="https://www.odaazado.hu/rolunk" />
        <meta property="og:title" content="Rólunk | Oda-Az-Adó Könyvelőiroda" />
        <meta property="og:description" content="Több mint 10 év könyvelési és adózási tapasztalat, szakmai felelősségbiztosítás, személyes debreceni jelenlét és online országos együttműködés." />
        <meta property="og:url" content="https://www.odaazado.hu/rolunk" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hu_HU" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      </Head>

      <PageShell>
        <AboutHero />
        <ExperienceSection />
        <PositioningSection />
        <PrinciplesSection />
        <ReachSection />
        <AboutCta />
      </PageShell>
    </>
  );
}
