import { company, offices } from "./contact";

export const siteUrl = "https://www.odaazado.hu";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  "@id": `${siteUrl}/#organization`,
  name: company.brand,
  legalName: company.legalName,
  url: siteUrl,
  email: offices.debrecen.email,
  telephone: offices.debrecen.phone,
  taxID: company.taxId,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Csokonai utca 4. 3/7.",
    postalCode: "4026",
    addressLocality: "Debrecen",
    addressCountry: "HU",
  },
  areaServed: [
    { "@type": "City", name: "Debrecen" },
    { "@type": "City", name: "Budapest" },
    { "@type": "Country", name: "Magyarország" },
  ],
  hasMap: offices.debrecen.mapUrl,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: offices.debrecen.phone,
      email: offices.debrecen.email,
      areaServed: "HU",
      availableLanguage: ["hu"],
    },
  ],
  location: [
    {
      "@type": "Place",
      name: "Oda-Az-Adó – Debreceni iroda",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Csokonai utca 4. 3/7.",
        postalCode: "4026",
        addressLocality: "Debrecen",
        addressCountry: "HU",
      },
      telephone: offices.debrecen.phone,
    },
  ],
};

export const makeBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.path}`,
  })),
});

export const makeFaqSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => {
    const q = Array.isArray(item) ? item[0] : item.q;
    const a = Array.isArray(item) ? item[1] : item.a;
    return {
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    };
  }),
});
