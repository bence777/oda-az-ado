import { useEffect, useState } from "react";
import Script from "next/script";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import design from "../../design/system";

const STORAGE_KEY = "odaazado_analytics_consent";

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState(null);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") setConsent(true);
    if (stored === "denied") setConsent(false);
  }, []);

  useEffect(() => {
    if (!consent || !measurementId) return undefined;

    const handleClick = (event) => {
      const link = event.target?.closest?.("a");
      if (!link || typeof window.gtag !== "function") return;
      const href = link.getAttribute("href") || "";
      if (href.includes("/kapcsolat") || href.includes("#ajanlatkeres")) {
        window.gtag("event", "cta_click", { link_url: href, link_text: link.textContent?.trim() || "" });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [consent, measurementId]);

  if (!measurementId) return null;

  function choose(value) {
    window.localStorage.setItem(STORAGE_KEY, value ? "granted" : "denied");
    setConsent(value);
  }

  return (
    <>
      {consent && measurementId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {consent === null ? (
        <Box position="fixed" zIndex="100" left={{ base: 4, md: 7 }} right={{ base: 4, md: "auto" }} bottom={{ base: 4, md: 7 }} maxW={{ md: "520px" }} p={{ base: 5, md: 6 }} bg={design.colors.ink} color="#fff" boxShadow="0 18px 50px rgba(0,0,0,.18)">
          <Text fontSize="12px" lineHeight="1.65" color="rgba(255,255,255,.72)">
            Statisztikai mérést csak az Ön hozzájárulása után töltünk be. Az oldal alapfunkciói elutasítás esetén is működnek.
          </Text>
          <Flex mt={5} gap={3} wrap="wrap">
            <Button type="button" onClick={() => choose(true)} h="40px" px={5} borderRadius="0" bg={design.colors.champagne} color={design.colors.ink} fontSize="10px" fontWeight="650" _hover={{ opacity: .9 }}>
              Engedélyezem
            </Button>
            <Button type="button" onClick={() => choose(false)} h="40px" px={5} borderRadius="0" bg="transparent" color="#fff" border="1px solid rgba(255,255,255,.28)" fontSize="10px" fontWeight="600" _hover={{ bg: "rgba(255,255,255,.06)" }}>
              Elutasítom
            </Button>
          </Flex>
        </Box>
      ) : null}
    </>
  );
}
