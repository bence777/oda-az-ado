import Head from "next/head";
import PageShell from "@/components/layout/PageShell";
import LocationsHero from "@/components/locations/LocationsHero";
import PrimaryLocationsSection from "@/components/locations/PrimaryLocationsSection";
import NationalSection from "@/components/locations/NationalSection";
import LocationsCta from "@/components/locations/LocationsCta";
import LocationsFaqSection, { locationFaqItems } from "@/components/locations/LocationsFaqSection";
import { makeBreadcrumbSchema, makeFaqSchema, organizationSchema, siteUrl } from "@/data/seo";

export default function LocationsPage() {
  const canonical = `${siteUrl}/helyszinek`;
  const title = "Könyvelés Debrecenben, Budapesten és online | Oda-Az-Adó";
  const description =
    "Könyvelés Debrecenben személyes irodával, budapesti és országos ügyfeleknek online együttműködéssel, digitális dokumentumkezeléssel és szakmai kapcsolattartással.";
  const breadcrumbs = makeBreadcrumbSchema([
    { name: "Kezdőlap", path: "/" },
    { name: "Helyszínek", path: "/helyszinek" },
  ]);

  const faqSchema = makeFaqSchema(locationFaqItems);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Helyszínek",
    description,
    url: canonical,
    about: { "@id": `${siteUrl}/#organization` },
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hu_HU" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <PageShell>
        <LocationsHero />
        <PrimaryLocationsSection />
        <NationalSection />
        <LocationsFaqSection />
        <LocationsCta />
      </PageShell>
    </>
  );
}
