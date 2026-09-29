import Head from "next/head";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import AnalyticsConsent from "@/components/layout/AnalyticsConsent";

export default function App({ Component, pageProps }) {
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <ChakraProvider value={defaultSystem}>
      <Head>
        {verification ? <meta name="google-site-verification" content={verification} /> : null}
      </Head>
      <Component {...pageProps} />
      <AnalyticsConsent />
    </ChakraProvider>
  );
}
