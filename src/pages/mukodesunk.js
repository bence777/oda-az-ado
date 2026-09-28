import Head from "next/head";
import PageShell from "@/components/layout/PageShell";
import OperationsHero from "@/components/operations/OperationsHero";
import OperationsFlowSection from "@/components/operations/OperationsFlowSection";
import OperationsControlSection from "@/components/operations/OperationsControlSection";
import OperationsReportingSection from "@/components/operations/OperationsReportingSection";
import OperationsCta from "@/components/operations/OperationsCta";
import OperationsFaqSection, { operationsFaqItems } from "@/components/operations/OperationsFaqSection";
import { makeBreadcrumbSchema, makeFaqSchema, organizationSchema, siteUrl } from "@/data/seo";

export default function OperationsPage() {
  const canonical = `${siteUrl}/mukodesunk`;
  const title = "Digitális könyvelési folyamat és vezetői információ | Oda-Az-Adó";
  const description =
    "Így dolgozunk: digitális dokumentumkezelés, ellenőrzés, NAV-egyeztetés, követhető feldolgozás, adókalkuláció és vezetői tájékoztatás.";
  const breadcrumbs = makeBreadcrumbSchema([
    { name: "Kezdőlap", path: "/" },
    { name: "Működésünk", path: "/mukodesunk" },
  ]);

  const faqSchema = makeFaqSchema(operationsFaqItems);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Működésünk",
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
        <OperationsHero />
        <OperationsFlowSection />
        <OperationsControlSection />
        <OperationsReportingSection />
        <OperationsFaqSection />
        <OperationsCta />
      </PageShell>
    </>
  );
}
