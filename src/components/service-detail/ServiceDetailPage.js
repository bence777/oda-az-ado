import Head from "next/head";
import PageShell from "../layout/PageShell";
import ServiceDetailHero from "./ServiceDetailHero";
import ServiceScopeSection from "./ServiceScopeSection";
import ServiceProcessSection from "./ServiceProcessSection";
import ServiceInsightSection from "./ServiceInsightSection";
import RelatedServicesSection from "./RelatedServicesSection";
import ServiceDetailCta from "./ServiceDetailCta";
import ServiceFaqSection from "./ServiceFaqSection";
import ServiceDecisionSection from "./ServiceDecisionSection";
import { serviceFaqs } from "../../data/serviceFaqs";
import { makeBreadcrumbSchema, makeFaqSchema, organizationSchema, siteUrl } from "../../data/seo";

export default function ServiceDetailPage({ service }) {
  const canonical = `${siteUrl}/${service.slug}`;
  const breadcrumbs = makeBreadcrumbSchema([
    { name: "Kezdőlap", path: "/" },
    { name: "Szolgáltatások", path: "/szolgaltatasok" },
    { name: service.name, path: `/${service.slug}` },
  ]);
  const faqs = serviceFaqs[service.slug] || [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.seoDescription,
    url: canonical,
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    serviceType: service.name,
    audience: { "@type": "BusinessAudience", audienceType: "Vállalkozások" },
    areaServed: [
      { "@type": "City", name: "Debrecen" },
      { "@type": "City", name: "Budapest" },
      { "@type": "Country", name: "Magyarország" },
    ],
  };

  const faqSchema = faqs.length ? makeFaqSchema(faqs) : null;

  return (
    <>
      <Head>
        <title>{service.seoTitle}</title>
        <meta name="description" content={service.seoDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={service.seoTitle} />
        <meta property="og:description" content={service.seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hu_HU" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {faqSchema ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        ) : null}
      </Head>

      <PageShell>
        <ServiceDetailHero service={service} />
        {service.slug === "adotanacsadas" || service.slug === "vezetoi-informacio" ? (
          <>
            <ServiceInsightSection service={service} />
            <ServiceScopeSection service={service} />
            <ServiceProcessSection service={service} />
          </>
        ) : service.slug === "konyvelovaltas" ? (
          <>
            <ServiceProcessSection service={service} />
            <ServiceScopeSection service={service} />
            <ServiceInsightSection service={service} />
          </>
        ) : service.slug === "berszamfejtes" ? (
          <>
            <ServiceScopeSection service={service} />
            <ServiceProcessSection service={service} />
            <ServiceDecisionSection service={service} />
            <ServiceInsightSection service={service} />
          </>
        ) : (
          <>
            <ServiceScopeSection service={service} />
            <ServiceInsightSection service={service} />
            <ServiceProcessSection service={service} />
          </>
        )}
        {service.slug !== "berszamfejtes" ? <ServiceDecisionSection service={service} /> : null}
        <ServiceFaqSection slug={service.slug} />
        <RelatedServicesSection currentSlug={service.slug} />
        <ServiceDetailCta service={service} />
      </PageShell>
    </>
  );
}
