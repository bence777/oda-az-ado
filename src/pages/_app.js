import Head from "next/head";
import { useRouter } from "next/router";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { Instrument_Sans } from "next/font/google";
import AnalyticsConsent from "@/components/layout/AnalyticsConsent";

const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const isAdmin = router.pathname.startsWith("/admin");

  return (
    <ChakraProvider value={defaultSystem}>
      <div className={instrumentSans.variable}>
      <Head>
        {verification ? <meta name="google-site-verification" content={verification} /> : null}
      </Head>
      <Component {...pageProps} />
      {!isAdmin ? <AnalyticsConsent /> : null}
      </div>
    </ChakraProvider>
  );
}
