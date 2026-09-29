import Head from "next/head";
import PageShell from "@/components/layout/PageShell";
import HomeHero from "@/components/home/HomeHero";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import ManagementSection from "@/components/home/ManagementSection";
import AccountantSwitchSection from "@/components/home/AccountantSwitchSection";
import AboutSection from "@/components/home/AboutSection";
import LocationsSection from "@/components/home/LocationsSection";
import FinalCta from "@/components/home/FinalCta";
import { organizationSchema } from "@/data/seo";

export default function Home() {
  return (
    <>
      <Head>
        <title>Oda-Az-Adó | Könyvelés Budapesten, Debrecenben és online</title>
        <meta name="description" content="Könyvelés, adótanácsadás, bérszámfejtés és vezetői információ vállalkozásoknak Debrecenben, Budapesten és online országosan." />
        <link rel="canonical" href="https://www.odaazado.hu/" />
        <meta property="og:title" content="Oda-Az-Adó | Könyvelés Budapesten, Debrecenben és online" />
        <meta property="og:description" content="Könyvelés, adótanácsadás, bérszámfejtés és vezetői információ vállalkozásoknak Debrecenben, Budapesten és online országosan." />
        <meta property="og:url" content="https://www.odaazado.hu/" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <meta property="og:locale" content="hu_HU" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </Head>
      <PageShell>
        <HomeHero />
        <TrustSection />
        <ServicesSection />
        <ProcessSection />
        <ManagementSection />
        <AccountantSwitchSection />
        <AboutSection />
        <LocationsSection />
        <FinalCta />
      </PageShell>
    </>
  );
}
