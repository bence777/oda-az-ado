import Head from "next/head";
import PageShell from "@/components/layout/PageShell";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceDetailsSection from "@/components/services/ServiceDetailsSection";
import SupportServicesSection from "@/components/services/SupportServicesSection";
import FinalCta from "@/components/home/FinalCta";
import ServicesFaqSection, { servicesFaqItems } from "@/components/services/ServicesFaqSection";
import { makeBreadcrumbSchema, makeFaqSchema, organizationSchema } from "@/data/seo";

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Oda-Az-Adó szolgáltatások",
  itemListElement: [
    { "@type": "ListItem", position: 1, url: "https://www.odaazado.hu/konyveles", name: "Könyvelés" },
    { "@type": "ListItem", position: 2, url: "https://www.odaazado.hu/adotanacsadas", name: "Adótanácsadás" },
    { "@type": "ListItem", position: 3, url: "https://www.odaazado.hu/berszamfejtes", name: "Bérszámfejtés" },
    { "@type": "ListItem", position: 4, url: "https://www.odaazado.hu/vezetoi-informacio", name: "Vezetői információ" },
  ],
};

const breadcrumbSchema = makeBreadcrumbSchema([
  { name: "Kezdőlap", path: "/" },
  { name: "Szolgáltatások", path: "/szolgaltatasok" },
]);

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Könyvelési szolgáltatások vállalkozásoknak | Oda-Az-Adó</title>
        <meta
          name="description"
          content="Könyvelés, adótanácsadás, bérszámfejtés és vezetői riportok vállalkozásoknak Debrecenben, Budapesten és online országosan."
        />
        <link rel="canonical" href="https://www.odaazado.hu/szolgaltatasok" />
        <meta property="og:title" content="Könyvelési szolgáltatások vállalkozásoknak | Oda-Az-Adó" />
        <meta property="og:description" content="Könyvelés, adótanácsadás, bérszámfejtés és vezetői riportok vállalkozásoknak Debrecenben, Budapesten és online országosan." />
        <meta property="og:url" content="https://www.odaazado.hu/szolgaltatasok" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hu_HU" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(makeFaqSchema(servicesFaqItems)) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </Head>

      <PageShell>
        <ServicesHero />
        <ServiceDetailsSection />
        <SupportServicesSection />
        <ServicesFaqSection />
        <FinalCta />
      </PageShell>
    </>
  );
}
