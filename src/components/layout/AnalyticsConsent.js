import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import design from "../../design/system";
import {
  COOKIE_SETTINGS_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from "../../lib/cookieConsent";

const ANALYTICS_COOKIE_SECONDS = 395 * 24 * 60 * 60; // kb. 13 hónap

function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname}`, ".odaazado.hu"];

  document.cookie.split(";").forEach((part) => {
    const name = part.split("=")[0]?.trim();
    if (!name || !(name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat")) return;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
    });
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
  });
}

function ChoiceRow({ title, description, active, disabled, onChange }) {
  return (
    <Flex gap={5} py={5} borderBottom="1px solid #E7EAF0" align="flex-start" justify="space-between">
      <Box pr={4}>
        <Text fontSize="14px" fontWeight="650" color="#111827">{title}</Text>
        <Text mt={1.5} fontSize="12px" lineHeight="1.65" color="#667085">{description}</Text>
      </Box>
      <Box
        as="button"
        type="button"
        aria-pressed={active}
        aria-label={`${title}: ${active ? "bekapcsolva" : "kikapcsolva"}`}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!active)}
        flex="0 0 auto"
        position="relative"
        w="44px"
        h="24px"
        border="0"
        borderRadius="999px"
        bg={active ? "#111827" : "#D0D5DD"}
        cursor={disabled ? "not-allowed" : "pointer"}
        opacity={disabled ? .72 : 1}
      >
        <Box position="absolute" top="3px" left={active ? "23px" : "3px"} w="18px" h="18px" borderRadius="50%" bg="#fff" transition="left 160ms ease" />
      </Box>
    </Flex>
  );
}

export default function AnalyticsConsent() {
  const router = useRouter();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [consent, setConsent] = useState(undefined);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draftAnalytics, setDraftAnalytics] = useState(false);

  const analyticsEnabled = Boolean(consent?.analytics && measurementId);
  const showBanner = useMemo(() => Boolean(measurementId && consent === null), [measurementId, consent]);

  useEffect(() => {
    const stored = readCookieConsent();
    setConsent(stored);
    setDraftAnalytics(Boolean(stored?.analytics));

    const open = () => {
      const latest = readCookieConsent();
      setDraftAnalytics(Boolean(latest?.analytics));
      setSettingsOpen(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    if (!measurementId || typeof window === "undefined") return;
    window[`ga-disable-${measurementId}`] = !analyticsEnabled;
    if (!analyticsEnabled) clearAnalyticsCookies();
  }, [analyticsEnabled, measurementId]);

  useEffect(() => {
    if (!analyticsEnabled) return undefined;
    const onRoute = (url) => {
      if (typeof window.gtag !== "function") return;
      window.gtag("event", "page_view", {
        page_location: window.location.href,
        page_path: url,
        page_title: document.title,
      });
    };
    router.events.on("routeChangeComplete", onRoute);
    return () => router.events.off("routeChangeComplete", onRoute);
  }, [analyticsEnabled, router.events]);

  useEffect(() => {
    if (!analyticsEnabled) return undefined;
    const handleClick = (event) => {
      const link = event.target?.closest?.("a");
      if (!link || typeof window.gtag !== "function") return;
      const href = link.getAttribute("href") || "";
      if (href.includes("/kapcsolat") || href.includes("#ajanlatkeres")) {
        window.gtag("event", "cta_click", {
          link_url: href,
          link_text: link.textContent?.trim() || "",
        });
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [analyticsEnabled]);

  if (!measurementId) return null;

  function commit(analytics) {
    const next = saveCookieConsent({ analytics });
    setConsent(next);
    setDraftAnalytics(Boolean(analytics));
    setSettingsOpen(false);
  }

  return (
    <>
      {analyticsEnabled ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
          <Script id="ga4-consented" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;window['ga-disable-${measurementId}']=false;gtag('js',new Date());gtag('config','${measurementId}',{allow_google_signals:false,allow_ad_personalization_signals:false,cookie_expires:${ANALYTICS_COOKIE_SECONDS},cookie_update:false});`}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <Box position="fixed" zIndex="1200" left={{ base: 3, md: 6 }} right={{ base: 3, md: "auto" }} bottom={{ base: 3, md: 6 }} maxW={{ md: "610px" }} border="1px solid #E4E7EC" borderRadius="18px" bg="#FFFFFF" boxShadow="0 24px 70px rgba(16,24,40,.18)" overflow="hidden">
          <Box p={{ base: 5, md: 6 }}>
            <Text fontSize={{ base: "17px", md: "18px" }} fontWeight="680" letterSpacing="-.02em" color="#101828">Süti- és adatvédelmi beállítások</Text>
            <Text mt={2.5} fontSize="12px" lineHeight="1.7" color="#667085">
              A működéshez szükséges technikai tárolást mindig használjuk. A Google Analytics statisztikai mérést csak az Ön hozzájárulása után kapcsoljuk be. A döntés később bármikor módosítható.
            </Text>
            <Text as="a" href="/suti-tajekoztato" display="inline-block" mt={3} fontSize="11px" fontWeight="620" color="#344054" textDecoration="underline" textUnderlineOffset="3px">
              Részletes süti tájékoztató
            </Text>
          </Box>
          <Grid p={{ base: 4, md: 5 }} pt="0" templateColumns={{ base: "1fr", sm: "1fr 1fr 1fr" }} gap={2.5}>
            <Button onClick={() => commit(true)} h="42px" borderRadius="10px" bg="#111827" color="#fff" fontSize="11px" _hover={{ bg: "#1F2937" }}>Összes elfogadása</Button>
            <Button onClick={() => commit(false)} h="42px" borderRadius="10px" bg="#F2F4F7" color="#1D2939" fontSize="11px" _hover={{ bg: "#E4E7EC" }}>Csak szükséges</Button>
            <Button onClick={() => setSettingsOpen(true)} h="42px" borderRadius="10px" bg="#fff" color="#344054" border="1px solid #D0D5DD" fontSize="11px" _hover={{ bg: "#F9FAFB" }}>Beállítások</Button>
          </Grid>
        </Box>
      ) : null}

      {settingsOpen ? (
        <Box position="fixed" inset="0" zIndex="1300" display="flex" alignItems="center" justifyContent="center" p={4} bg="rgba(15,23,42,.48)" backdropFilter="blur(4px)" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setSettingsOpen(false); }}>
          <Box role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title" w="100%" maxW="620px" maxH="90vh" overflowY="auto" bg="#fff" borderRadius="18px" boxShadow="0 28px 90px rgba(15,23,42,.28)">
            <Box p={{ base: 5, md: 7 }}>
              <Flex justify="space-between" gap={5} align="flex-start">
                <Box>
                  <Text id="cookie-settings-title" fontSize="20px" fontWeight="700" letterSpacing="-.025em" color="#101828">Adatvédelmi beállítások</Text>
                  <Text mt={2} fontSize="12px" lineHeight="1.7" color="#667085">Ön dönti el, hogy a szükséges működésen felül engedélyezi-e a statisztikai mérést.</Text>
                </Box>
                <Button onClick={() => setSettingsOpen(false)} minW="36px" h="36px" p="0" borderRadius="10px" bg="#F2F4F7" color="#344054" aria-label="Bezárás">×</Button>
              </Flex>

              <Box mt={6} borderTop="1px solid #E7EAF0">
                <ChoiceRow title="Szükséges" description="A weboldal alapműködéséhez és a választott adatvédelmi beállítás megjegyzéséhez szükséges technikai tárolás. Nem kapcsolható ki." active disabled />
                <ChoiceRow title="Statisztika" description="Google Analytics. Segít megérteni, mely oldalakat és funkciókat használják. Csak engedélyezés után töltődik be." active={draftAnalytics} onChange={setDraftAnalytics} />
              </Box>

              <Flex mt={6} gap={3} direction={{ base: "column-reverse", sm: "row" }} justify="space-between" align={{ sm: "center" }}>
                <Text as="a" href="/adatkezelesi-tajekoztato" fontSize="11px" color="#667085" textDecoration="underline" textUnderlineOffset="3px">Adatkezelési tájékoztató</Text>
                <Flex gap={2.5}>
                  <Button onClick={() => commit(false)} h="40px" borderRadius="10px" bg="#F2F4F7" color="#344054" fontSize="11px">Mindet elutasítom</Button>
                  <Button onClick={() => commit(draftAnalytics)} h="40px" borderRadius="10px" bg="#111827" color="#fff" fontSize="11px">Beállítások mentése</Button>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
