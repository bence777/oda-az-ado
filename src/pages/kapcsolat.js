import Head from "next/head";
import PageShell from "@/components/layout/PageShell";
import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactExpectationSection from "@/components/contact/ContactExpectationSection";
import ContactFaqSection, { contactFaqItems } from "@/components/contact/ContactFaqSection";
import { makeBreadcrumbSchema, makeFaqSchema, organizationSchema, siteUrl } from "@/data/seo";

export default function ContactPage() {
  const canonical = `${siteUrl}/kapcsolat`;
  const title = "Kapcsolat és ajánlatkérés könyveléshez | Oda-Az-Adó";
  const description =
    "Vegye fel velünk a kapcsolatot könyvelés, adótanácsadás, bérszámfejtés vagy könyvelőváltás miatt. Debreceni iroda, online együttműködés Budapesten és országosan.";
  const breadcrumbs = makeBreadcrumbSchema([
    { name: "Kezdőlap", path: "/" },
    { name: "Kapcsolat", path: "/kapcsolat" },
  ]);

  const faqSchema = makeFaqSchema(contactFaqItems);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kapcsolat és ajánlatkérés",
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
        <ContactHero />
        <ContactFormSection />
        <ContactExpectationSection />
        <ContactDetails />
        <ContactFaqSection />
      </PageShell>
    </>
  );
}
