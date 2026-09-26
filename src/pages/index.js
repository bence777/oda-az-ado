import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import design from "@/design/system";

/* =========================================================
   DATA
========================================================= */

const navItems = [
  { label: "Szolgáltatások", href: "#szolgaltatasok" },
  { label: "Működésünk", href: "#mukodes" },
  { label: "Rólunk", href: "#rolunk" },
  { label: "Könyvelőváltás", href: "#konyvelovaltas" },
  { label: "Kapcsolat", href: "#kapcsolat" },
];

const trustItems = [
  {
    value: "10+",
    title: "év szakmai tapasztalat",
    text: "Több mint egy évtized vállalkozások mellett.",
  },
  {
    value: "Szakmai",
    title: "felelősségbiztosítás",
    text: "Biztosítási háttér a szakmai munkához.",
  },
  {
    value: "Határidő",
    title: "pontos munkavégzés",
    text: "Követhető, tervezhető működés.",
  },
  {
    value: "Érthető",
    title: "pénzügyi információ",
    text: "Nem csak adatokat adunk át.",
  },
];

const services = [
  {
    title: "Könyvelés",
    text: "Teljes körű könyvelés vállalkozásoknak, átlátható folyamatokkal.",
    href: "/konyveles",
  },
  {
    title: "Adótanácsadás",
    text: "Előre gondolkodunk, nem csak utólag számolunk.",
    href: "/szolgaltatasok/adotanacsadas",
  },
  {
    title: "Bérszámfejtés",
    text: "Pontos, követhető és határidőre elkészített.",
    href: "/szolgaltatasok/berelszamolas",
  },
  {
    title: "Vezetői információ",
    text: "Érthető riportok, eredmény- és adókalkuláció, döntéstámogatás.",
    href: "#vezetoi-informacio",
  },
];

const processSteps = [
  { title: "Dokumentumok", text: "beérkezése" },
  { title: "Ellenőrzés", text: "és feldolgozás" },
  { title: "NAV-egyeztetés", text: "és ellenőrzés" },
  { title: "Könyvelés", text: "és státusz" },
  { title: "Archiválás", text: "és visszakeresés" },
];

const switchSteps = [
  ["Egyeztetés", "A vállalkozás és az együttműködési igények áttekintése."],
  ["Jelenlegi helyzet", "Megnézzük, honnan indul az átadás-átvétel."],
  ["Dokumentumok", "Meghatározzuk a szükséges anyagokat és adatokat."],
  ["Átadás-átvétel", "A könyvelési anyagok rendezett átvétele."],
  ["Ellenőrzés", "Az átvett adatok és dokumentumok áttekintése."],
  ["Átállás", "Az új együttműködés elindítása."],
];

const chartData = [
  { label: "Okt", value: 22.8 },
  { label: "Nov", value: 25.4 },
  { label: "Dec", value: 24.8 },
  { label: "Jan", value: 28.3 },
  { label: "Feb", value: 29.1 },
  { label: "Már", value: 33.7 },
  { label: "Ápr", value: 32.9 },
  { label: "Máj", value: 37.5 },
  { label: "Jún", value: 39.4 },
  { label: "Júl", value: 42.1 },
  { label: "Aug", value: 44.3 },
  { label: "Szept", value: 48.2 },
];

const CHART_WIDTH = 700;
const CHART_HEIGHT = 260;
const CHART_TOP = 34;
const CHART_BOTTOM = 222;
const CHART_MIN = 20;
const CHART_MAX = 52;
const CHART_INSET_X = 18;

const chartPoints = chartData.map((item, index) => ({
  ...item,
  x:
    CHART_INSET_X +
    (index / (chartData.length - 1)) *
      (CHART_WIDTH - CHART_INSET_X * 2),
  y:
    CHART_BOTTOM -
    ((item.value - CHART_MIN) / (CHART_MAX - CHART_MIN)) *
      (CHART_BOTTOM - CHART_TOP),
}));

function buildSmoothPath(points) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const previous = points[i - 1] || current;
    const afterNext = points[i + 2] || next;

    const cp1x = current.x + (next.x - previous.x) / 6;
    const cp1y = current.y + (next.y - previous.y) / 6;
    const cp2x = next.x - (afterNext.x - current.x) / 6;
    const cp2y = next.y - (afterNext.y - current.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return path;
}

const chartLinePath = buildSmoothPath(chartPoints);
const chartAreaPath = `${chartLinePath} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`;

/* =========================================================
   PAGE
========================================================= */

export default function Home() {
  return (
    <>
      <Head>
        <title>Oda-Az-Adó | Könyvelés Debrecenben és online</title>
        <meta
          name="description"
          content="Könyvelés, adótanácsadás, bérszámfejtés és vezetői információ vállalkozásoknak Debrecenben, Budapesten és online országosan."
        />
      </Head>

      <Box
        minH="100vh"
        bg={design.colors.white}
        color={design.colors.ink}
        fontFamily={design.fonts.sans}
        overflow="hidden"
      >
        <SiteHeader />
        <Box as="main">
          <Hero />
          <TrustSection />
          <ServicesSection />
          <ProcessSection />
          <ManagementSection />
          <AccountantSwitchSection />
          <AboutSection />
          <LocationsSection />
          <FinalCta />
        </Box>
        <SiteFooter />
      </Box>
    </>
  );
}

/* =========================================================
   HEADER
========================================================= */

function SiteHeader() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Box
      as="header"
      position="relative"
      zIndex="30"
      bg={design.colors.white}
      opacity={mounted ? 1 : 0}
      transform={mounted ? "translateY(0)" : "translateY(-12px)"}
      transition="opacity .8s ease .1s, transform .8s ease .1s"
    >
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Flex
          h={{ base: "78px", md: "92px", lg: "104px" }}
          align="center"
          justify="space-between"
        >
          <Text
            as="a"
            href="/"
            fontSize={{ base: "19px", md: "22px" }}
            fontWeight="650"
            letterSpacing="-0.055em"
            color={design.colors.ink}
            lineHeight="1"
          >
            ODA-AZ-ADÓ
          </Text>

          <Flex
            display={{ base: "none", lg: "flex" }}
            align="center"
            gap={{ lg: 7, xl: 9 }}
          >
            {navItems.map((item) => (
              <Text
                key={item.label}
                as="a"
                href={item.href}
                position="relative"
                fontSize="11px"
                fontWeight="500"
                color={design.colors.muted}
                transition={design.transition}
                _after={{
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: "-7px",
                  w: "100%",
                  h: "1px",
                  bg: design.colors.champagne,
                  transform: "scaleX(0)",
                  transformOrigin: "right",
                  transition: design.transition,
                }}
                _hover={{
                  color: design.colors.ink,
                  _after: {
                    transform: "scaleX(1)",
                    transformOrigin: "left",
                  },
                }}
              >
                {item.label}
              </Text>
            ))}
          </Flex>

          <Text
            as="a"
            href="#kapcsolat"
            display={{ base: "none", sm: "block" }}
            position="relative"
            fontSize="11px"
            fontWeight="600"
            color={design.colors.ink}
            pb="5px"
            _after={{
              content: '""',
              position: "absolute",
              left: 0,
              bottom: 0,
              w: "100%",
              h: "1px",
              bg: design.colors.champagne,
            }}
          >
            Ajánlatot kérek
          </Text>

          <Box
            as="button"
            type="button"
            aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={menuOpen}
            display={{ base: "block", lg: "none" }}
            position="relative"
            w="30px"
            h="30px"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <Box
              position="absolute"
              left="2px"
              top={menuOpen ? "14px" : "10px"}
              w="26px"
              h="1px"
              bg={design.colors.ink}
              transform={menuOpen ? "rotate(45deg)" : "rotate(0)"}
              transition="top .25s ease, transform .25s ease"
            />
            <Box
              position="absolute"
              right="2px"
              top={menuOpen ? "14px" : "19px"}
              w={menuOpen ? "26px" : "18px"}
              h="1px"
              bg={design.colors.ink}
              transform={menuOpen ? "rotate(-45deg)" : "rotate(0)"}
              transition="top .25s ease, width .25s ease, transform .25s ease"
            />
          </Box>
        </Flex>

        <Box
          display={{ base: "block", lg: "none" }}
          maxH={menuOpen ? "420px" : "0"}
          opacity={menuOpen ? 1 : 0}
          overflow="hidden"
          borderTop={menuOpen ? "1px solid" : "0 solid"}
          borderColor={design.colors.border}
          transition="max-height .45s cubic-bezier(.16,1,.3,1), opacity .3s ease"
        >
          <Box py={5}>
            {navItems.map((item) => (
              <Text
                key={item.label}
                as="a"
                href={item.href}
                display="block"
                py={3}
                fontSize="15px"
                fontWeight="500"
                color={{ base: "#0000", md: design.colors.ink }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Text>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* =========================================================
   HERO
========================================================= */

function Hero() {
  const [mounted, setMounted] = useState(false);
  const visualRef = useRef(null);
  const mainImageRef = useRef(null);
  const secondaryImageRef = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const section = visualRef.current;
    const mainImage = mainImageRef.current;
    const secondaryImage = secondaryImageRef.current;

    if (!section || !mainImage || !secondaryImage) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    let ticking = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      const distance =
        (sectionCenter - viewportCenter) /
        ((viewportHeight + rect.height) / 2);

      const progress = Math.max(-1, Math.min(1, distance));

      mainImage.style.transform = `translate3d(0, ${progress * 58}px, 0) scale(1.10)`;
      secondaryImage.style.transform = `translate3d(${progress * 12}px, ${progress * -82}px, 0) scale(1.08)`;

      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <Box position="relative" overflow="hidden">
      <Box
        display={{ base: "block", md: "none" }}
        position="absolute"
        inset="0 0 auto 0"
        h="760px"
        overflow="hidden"
      >
        <Image
          src="https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?auto=format&fit=crop&w=1800&q=90"
          alt="Budapest látképe"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center 50%"
          filter="saturate(.78) contrast(1.02)"
        />
        <Box
          position="absolute"
          inset="0"
          bg="linear-gradient(180deg, rgba(9,17,22,.58) 0%, rgba(9,17,22,.42) 28%, rgba(9,17,22,.72) 100%)"
        />
      </Box>

      <Container
        maxW={design.sizes.container}
        px={design.spacing.pageX}
        position="relative"
        zIndex="2"
      >
        <Grid
          pt={{ base: 12, md: 18, lg: 20, xl: 24 }}
          templateColumns={{
            base: "1fr",
            lg: "minmax(0, 1.55fr) minmax(300px, .45fr)",
          }}
          gap={{ base: 8, md: 12, lg: 16, xl: 24 }}
          alignItems="end"
        >
          <Box overflow="hidden">
            <Heading
              as="h1"
              maxW="1040px"
              m="0"
              fontFamily={design.fonts.sans}
              fontSize={{
                base: "50px",
                sm: "61px",
                md: "76px",
                lg: "84px",
                xl: "96px",
              }}
              fontWeight="500"
              lineHeight=".94"
              letterSpacing="-0.068em"
              color={{ base: "#FFFFFF", md: design.colors.ink }}
              opacity={mounted ? 1 : 0}
              transform={mounted ? "translateY(0)" : "translateY(55px)"}
              transition="opacity 1s cubic-bezier(.16,1,.3,1) .15s, transform 1s cubic-bezier(.16,1,.3,1) .15s"
            >
              Könyvelés, amiből látja,
              <br />
              mi történik{" "}
              <Box as="span" color={design.colors.champagne}>
                a cégében.
              </Box>
            </Heading>
          </Box>

          <Box
            maxW="370px"
            opacity={mounted ? 1 : 0}
            transform={mounted ? "translateY(0)" : "translateY(24px)"}
            transition="opacity .9s ease .55s, transform .9s cubic-bezier(.16,1,.3,1) .55s"
          >
            <Text
              fontSize={{ base: "16px", md: "17px", xl: "18px" }}
              lineHeight="1.62"
              letterSpacing="-0.022em"
              color={{ base: "rgba(255,255,255,.84)", md: design.colors.graphite }}
            >
              Pontos könyvelés és szakmai támogatás azoknak, akik
              nemcsak tudni, hanem{" "}
              <Box as="span" color={{ base: "rgba(255,255,255,.68)", md: design.colors.muted }}>
                érteni is szeretnék a számokat.
              </Box>
            </Text>

            <Flex mt={{ base: 7, md: 9 }} align="center" gap={{ base: 4, md: 6 }} wrap="wrap">
              <Button
                as="a"
                href="#kapcsolat"
                h="52px"
                px={8}
                borderRadius="0"
                bg={{ base: "rgba(255,255,255,1)", md: design.colors.ink }}
                color={{ base: design.colors.ink, md: design.colors.white }}
                fontSize="11px"
                fontWeight="600"
                transition="background .3s ease, color .3s ease, transform .3s ease"
                _hover={{
                  color: design.colors.ink,
                }}
              >
                Ajánlatot kérek
              </Button>

              <Text
                as="a"
                href="#mukodes"
                position="relative"
                pb="4px"
                fontSize="11px"
                fontWeight="600"
                color={{ base: "#FFFFFF", md: design.colors.ink }}
                _after={{
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  w: "100%",
                  h: "1px",
                  bg: design.colors.champagne,
                }}
              >
                Megnézem, hogyan dolgozunk
              </Text>
            </Flex>
          </Box>
        </Grid>
      </Container>

      <Box
        ref={visualRef}
        position="relative"
        mt={{ base: 0, md: 16, lg: 18 }}
        display={{ base: "none", md: "block" }}
      >
        <Container maxW={design.sizes.container} px={design.spacing.pageX}>
          <Box
            position="relative"
            ml={{ base: 0, lg: "15%" }}
            pb={{ base: 0, md: "72px", lg: "96px" }}
          >
            <Box
              position="relative"
              zIndex="2"
              overflow="hidden"
              bg={design.colors.offWhite}
              clipPath={mounted ? "inset(0 0 0 0)" : "inset(0 0 100% 0)"}
              transition="clip-path 1.35s cubic-bezier(.16,1,.3,1) .3s"
            >
              <Box
                ref={mainImageRef}
                h={{
                  base: "440px",
                  sm: "510px",
                  md: "600px",
                  lg: "650px",
                  xl: "710px",
                }}
                willChange="transform"
                transform="translate3d(0,0,0) scale(1.10)"
              >
                <Image
                  src="https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?auto=format&fit=crop&w=2400&q=90"
                  alt="Budapest látképe"
                  display="block"
                  w="100%"
                  h="124%"
                  mt="-12%"
                  objectFit="cover"
                  objectPosition="center 52%"
                  userSelect="none"
                  pointerEvents="none"
                />
              </Box>

              <Box
                position="absolute"
                inset="0"
                zIndex="2"
                pointerEvents="none"
                bg="linear-gradient(180deg, rgba(13,22,26,0) 55%, rgba(13,22,26,.18) 100%)"
              />
            </Box>

            <Box
              position="absolute"
              display={{ base: "none", md: "block" }}
              zIndex="4"
              left={{ md: "-8%", lg: "-15%" }}
              bottom={{ md: "10px", lg: "0" }}
              w={{ md: "240px", lg: "300px", xl: "330px" }}
              h={{ md: "320px", lg: "390px", xl: "430px" }}
              overflow="hidden"
              bg={design.colors.offWhite}
              clipPath={mounted ? "inset(0 0 0 0)" : "inset(100% 0 0 0)"}
              transition="clip-path 1.15s cubic-bezier(.16,1,.3,1) .65s"
            >
              <Box
                ref={secondaryImageRef}
                w="100%"
                h="100%"
                willChange="transform"
                transform="translate3d(0,0,0) scale(1.08)"
              >
                <Image
                  src="https://images.unsplash.com/photo-1705697356051-57e3943d932a?auto=format&fit=crop&w=1200&q=90"
                  alt="Debreceni Nagytemplom"
                  display="block"
                  w="100%"
                  h="124%"
                  mt="-12%"
                  objectFit="cover"
                  objectPosition="center"
                  filter="saturate(.78)"
                  userSelect="none"
                  pointerEvents="none"
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

/* =========================================================
   TRUST
========================================================= */

function TrustSection() {
  return (
    <Box pt={{ base: 20, md: 28, lg: 36 }} pb={{ base: 20, md: 26, lg: 32 }}>
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1.15fr .85fr" }}
          gap={{ base: 8, lg: 20 }}
          alignItems="end"
          pb={{ base: 14, md: 18 }}
        >
          <Heading
            as="h2"
            maxW="760px"
            fontFamily={design.fonts.sans}
            fontSize={{ base: "38px", sm: "46px", md: "56px", lg: "64px" }}
            fontWeight="500"
            lineHeight="1"
            letterSpacing="-0.055em"
            color={design.colors.ink}
          >
            A pontosság nálunk
            <Box as="span" color={design.colors.graphite}>
              {" "}nem extra.
            </Box>
            <br />
            <Box as="span" color={design.colors.champagne}>
              Alap.
            </Box>
          </Heading>

          <Text
            maxW="440px"
            justifySelf={{ lg: "end" }}
            fontSize={{ base: "15px", md: "16px" }}
            lineHeight="1.7"
            color={design.colors.muted}
          >
            A vállalkozása pénzügyi hátterében nincs helye találgatásnak.
            Rendezett folyamatokkal, követhető munkával és érthető
            információval dolgozunk.
          </Text>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr 1fr", lg: "repeat(4,1fr)" }}
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor={design.colors.border}
        >
          {trustItems.map((item, index) => (
            <Box
              key={item.value}
              minH={{ base: "200px", lg: "250px" }}
              py={{ base: 7, md: 9 }}
              px={{ base: index % 2 ? 5 : 0, md: 6, lg: 7 }}
              borderLeft={{
                base: index % 2 ? "1px solid" : "none",
                lg: index ? "1px solid" : "none",
              }}
              borderTop={{
                base: index > 1 ? "1px solid" : "none",
                lg: "none",
              }}
              borderColor={design.colors.border}
            >
              <Box w="28px" h="2px" bg={design.colors.champagne} mb={6} />

              <Text
                fontSize={{ base: "30px", md: "37px", lg: "42px" }}
                fontWeight="500"
                lineHeight="1"
                letterSpacing="-0.055em"
                color={design.colors.ink}
              >
                {item.value}
              </Text>

              <Text
                mt={{ base: 5, md: 8 }}
                maxW="220px"
                fontSize="14px"
                fontWeight="600"
                lineHeight="1.3"
                color={design.colors.graphite}
              >
                {item.title}
              </Text>

              <Text
                mt={3}
                maxW="220px"
                fontSize="12px"
                lineHeight="1.6"
                color={design.colors.quiet}
              >
                {item.text}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   SERVICES
========================================================= */

function ServicesSection() {
  return (
    <Box id="szolgaltatasok" py={{ base: 22, md: 30, lg: 38 }}>
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: ".8fr 1.2fr" }}
          gap={{ base: 12, lg: 20, xl: 28 }}
        >
          <Box position={{ lg: "sticky" }} top={{ lg: "120px" }} alignSelf="start">
            <Heading
              as="h2"
              maxW="550px"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "40px", md: "52px", lg: "60px" }}
              fontWeight="500"
              lineHeight="1"
              letterSpacing="-0.055em"
              color={design.colors.ink}
            >
              Több, mint
              <br />
              könyvelés.
            </Heading>

            <Text
              mt={7}
              maxW="390px"
              fontSize="15px"
              lineHeight="1.7"
              color={design.colors.muted}
            >
              A pontos könyvelés az alap. A valódi érték akkor kezdődik,
              amikor a számokból érthető információ és jobb döntés lesz.
            </Text>
          </Box>

          <Box borderTop="1px solid" borderColor={design.colors.border}>
            {services.map((service, index) => (
              <Box
                key={service.title}
                as="a"
                href={service.href}
                display="block"
                position="relative"
                py={{ base: 7, md: 9 }}
                borderBottom="1px solid"
                borderColor={design.colors.border}
                overflow="hidden"
                role="group"
              >
                <Box
                  position="absolute"
                  inset="0"
                  bg="#F4F6F6"
                  transform="translateY(102%)"
                  transition="transform .5s cubic-bezier(.16,1,.3,1)"
                  _groupHover={{ transform: "translateY(0)" }}
                />

                <Box
                  position="absolute"
                  left="0"
                  top="0"
                  w="3px"
                  h="100%"
                  bg={design.colors.champagne}
                  transform="scaleY(0)"
                  transformOrigin="bottom"
                  transition="transform .45s cubic-bezier(.16,1,.3,1)"
                  _groupHover={{
                    transform: "scaleY(1)",
                    transformOrigin: "top",
                  }}
                />

                <Grid
                  position="relative"
                  zIndex="1"
                  templateColumns={{
                    base: "42px 1fr",
                    md: "70px .8fr 1fr",
                  }}
                  gap={{ base: 4, md: 8 }}
                  alignItems="start"
                  px={{ base: 0, md: 2 }}
                  transition="transform .45s cubic-bezier(.16,1,.3,1)"
                  _groupHover={{
                    transform: { md: "translateX(14px)" },
                  }}
                >
                  <Text
                    pt="4px"
                    fontSize="10px"
                    fontWeight="600"
                    color={design.colors.champagne}
                  >
                    0{index + 1}
                  </Text>

                  <Heading
                    as="h3"
                    fontFamily={design.fonts.sans}
                    fontSize={{ base: "21px", md: "25px" }}
                    fontWeight="550"
                    lineHeight="1.15"
                    letterSpacing="-0.035em"
                    color={design.colors.ink}
                  >
                    {service.title}
                  </Heading>

                  <Text
                    gridColumn={{ base: "2", md: "auto" }}
                    maxW="390px"
                    fontSize={{ base: "13px", md: "14px" }}
                    lineHeight="1.65"
                    color={design.colors.muted}
                  >
                    {service.text}
                  </Text>
                </Grid>
              </Box>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   PROCESS
========================================================= */

function ProcessSection() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const steps = stepRefs.current;

    if (!section || !line || !steps.length) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      line.style.transform = "scaleX(1)";
      steps.forEach((step) => {
        if (!step) return;
        const dot = step.querySelector("[data-process-dot]");
        const title = step.querySelector("[data-process-title]");
        const text = step.querySelector("[data-process-text]");
        if (dot) {
          dot.style.transform = "scale(1)";
          dot.style.backgroundColor = design.colors.champagne;
          dot.style.borderColor = design.colors.champagne;
        }
        if (title) {
          title.style.opacity = "1";
          title.style.transform = "translate3d(0,0,0)";
        }
        if (text) text.style.opacity = "1";
      });
      return;
    }

    let ticking = false;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.78;
      const end = -rect.height * 0.18;
      const rawProgress = (start - rect.top) / (start - end);
      const progress = Math.max(0, Math.min(1, rawProgress));

      line.style.transform = `scaleX(${progress})`;

      steps.forEach((step, index) => {
        if (!step) return;

        const threshold = index / Math.max(steps.length - 1, 1);
        const localProgress = Math.max(
          0,
          Math.min(1, (progress - threshold + 0.12) / 0.18)
        );

        const dot = step.querySelector("[data-process-dot]");
        const title = step.querySelector("[data-process-title]");
        const text = step.querySelector("[data-process-text]");

        if (dot) {
          dot.style.transform = `scale(${0.72 + localProgress * 0.28})`;
          dot.style.backgroundColor =
            localProgress > 0.5
              ? design.colors.champagne
              : design.colors.white;
          dot.style.borderColor =
            localProgress > 0.5
              ? design.colors.champagne
              : design.colors.ink;
        }

        if (title) {
          title.style.opacity = String(0.35 + localProgress * 0.65);
          title.style.transform = `translate3d(0, ${(1 - localProgress) * 8}px, 0)`;
        }

        if (text) {
          text.style.opacity = String(0.28 + localProgress * 0.72);
        }
      });

      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="mukodes"
      position="relative"
      py={{ base: 24, md: 34, lg: 44 }}
      bg="#F4F5F3"
      overflow="hidden"
    >
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr .75fr" }}
          gap={{ base: 8, lg: 20 }}
          alignItems="end"
        >
          <Heading
            as="h2"
            maxW="800px"
            fontFamily={design.fonts.sans}
            fontSize={{ base: "43px", sm: "50px", md: "62px", lg: "72px" }}
            fontWeight="500"
            lineHeight=".98"
            letterSpacing="-0.06em"
            color={design.colors.ink}
          >
            A könyvelés mögött
            <Box as="span" display="block" color={design.colors.graphite}>
              rendszer van.
            </Box>
          </Heading>

          <Text
            maxW="430px"
            justifySelf={{ lg: "end" }}
            fontSize={{ base: "15px", md: "16px" }}
            lineHeight="1.7"
            color={design.colors.muted}
          >
            Digitális dokumentumkezelés, strukturált feldolgozás,
            NAV-egyeztetés, státuszok és visszakereshető archiválás.
          </Text>
        </Grid>

        <Box
          display={{ base: "none", md: "block" }}
          position="relative"
          mt={{ md: 24, lg: 30 }}
          pt={10}
        >
          <Box
            position="absolute"
            top="45px"
            left="0"
            right="0"
            h="1px"
            bg="rgba(16,25,29,.14)"
          />

          <Box
            ref={lineRef}
            position="absolute"
            top="45px"
            left="0"
            right="0"
            h="2px"
            bg={design.colors.champagne}
            transform="scaleX(0)"
            transformOrigin="left center"
            willChange="transform"
          />

          <Grid position="relative" zIndex="2" templateColumns="repeat(5,1fr)">
            {processSteps.map((step, index) => (
              <Box
                key={step.title}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
                pr={{ md: 5, lg: 8 }}
              >
                <Flex
                  data-process-dot
                  w="12px"
                  h="12px"
                  mb={10}
                  borderRadius="50%"
                  border="2px solid"
                  borderColor={design.colors.ink}
                  bg={design.colors.white}
                  transform="scale(.72)"
                  willChange="transform"
                />

                <Text
                  fontSize="10px"
                  fontWeight="600"
                  color={design.colors.champagne}
                  mb={4}
                >
                  0{index + 1}
                </Text>

                <Text
                  data-process-title
                  fontSize={{ md: "17px", lg: "19px" }}
                  fontWeight="600"
                  lineHeight="1.25"
                  letterSpacing="-0.03em"
                  color={design.colors.ink}
                  opacity=".35"
                  transform="translate3d(0,8px,0)"
                  willChange="transform, opacity"
                >
                  {step.title}
                </Text>

                <Text
                  data-process-text
                  mt={2}
                  fontSize="12px"
                  lineHeight="1.55"
                  color={design.colors.muted}
                  opacity=".28"
                  willChange="opacity"
                >
                  {step.text}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>

        <Box
          display={{ base: "block", md: "none" }}
          mt={16}
          borderTop="1px solid"
          borderColor={design.colors.border}
        >
          {processSteps.map((step, index) => (
            <Grid
              key={step.title}
              templateColumns="46px 1fr"
              gap={4}
              py={6}
              borderBottom="1px solid"
              borderColor={design.colors.border}
            >
              <Text fontSize="10px" color={design.colors.champagne}>
                0{index + 1}
              </Text>

              <Box>
                <Text fontSize="17px" fontWeight="600" color={design.colors.ink}>
                  {step.title}
                </Text>
                <Text mt={1} fontSize="12px" color={design.colors.muted}>
                  {step.text}
                </Text>
              </Box>
            </Grid>
          ))}
        </Box>

        <Grid
          mt={{ base: 16, md: 24, lg: 30 }}
          pt={{ base: 10, md: 12 }}
          borderTop="1px solid"
          borderColor={design.colors.border}
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 7, md: 16 }}
          alignItems="end"
        >
          <Text
            maxW="620px"
            fontSize={{ base: "25px", md: "31px", lg: "35px" }}
            fontWeight="500"
            lineHeight="1.18"
            letterSpacing="-0.04em"
            color={design.colors.ink}
          >
            Kevesebb adminisztráció.
            <br />
            Több átláthatóság.
          </Text>

          <Text
            maxW="400px"
            justifySelf={{ md: "end" }}
            fontSize="13px"
            lineHeight="1.7"
            color={design.colors.muted}
          >
            A cél nem a technológia önmagában, hanem a rendezett,
            követhető és visszakereshető könyvelési háttér.
          </Text>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   MANAGEMENT / INTERACTIVE CHART
========================================================= */

function ManagementSection() {
  const dashboardRef = useRef(null);
  const [chartVisible, setChartVisible] = useState(false);
  const [chartInteractive, setChartInteractive] = useState(false);
  const [activeChartIndex, setActiveChartIndex] = useState(null);

  useEffect(() => {
    const dashboard = dashboardRef.current;
    if (!dashboard) return;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setChartVisible(true);
      return;
    }

    let firstFrame = 0;
    let secondFrame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Két frame-et várunk, hogy a böngésző biztosan kirajzolja
        // a zárt kezdőállapotot, és csak utána induljon az animáció.
        firstFrame = requestAnimationFrame(() => {
          secondFrame = requestAnimationFrame(() => {
            setChartVisible(true);
          });
        });

        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(dashboard);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);

  useEffect(() => {
    if (!chartVisible) {
      setChartInteractive(false);
      setActiveChartIndex(null);
      return;
    }

    // A hover csak a teljes belépő animáció után aktiválódjon.
    // Így görgetés közben a diagram nem nyílik meg már eleve egy tooltip-ponttal.
    const timeout = window.setTimeout(() => {
      setChartInteractive(true);
    }, 1900);

    return () => window.clearTimeout(timeout);
  }, [chartVisible]);

  const handleChartPointer = (event) => {
    if (!chartInteractive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width)
    );

    const index = Math.round(ratio * (chartData.length - 1));
    setActiveChartIndex((current) => (current === index ? current : index));
  };

  const activePoint =
    activeChartIndex === null ? null : chartPoints[activeChartIndex];

  return (
    <Box
      id="vezetoi-informacio"
      position="relative"
      bg={design.colors.ink}
      color="#FFFFFF"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="1px"
        bg="rgba(181,154,114,.45)"
      />

      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          minH={{ base: "auto", lg: "820px" }}
          templateColumns={{ base: "1fr", lg: ".82fr 1.18fr" }}
          gap={{ base: 16, lg: 16, xl: 22 }}
          alignItems="center"
          py={{ base: 24, md: 30, lg: 24 }}
        >
          <Box maxW="520px">
            <Heading
              as="h2"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "43px", sm: "50px", md: "62px", lg: "68px" }}
              fontWeight="500"
              lineHeight=".98"
              letterSpacing="-0.06em"
              color="#FFFFFF"
            >
              Nem elég tudni,
              <br />
              mi történt.
            </Heading>

            <Text
              mt={9}
              fontSize={{ base: "18px", md: "20px" }}
              lineHeight="1.5"
              letterSpacing="-0.025em"
              color={design.colors.champagne}
            >
              Azt is látni kell,
              <br />
              mi következik.
            </Text>

            <Text
              mt={6}
              maxW="420px"
              fontSize="15px"
              lineHeight="1.75"
              color="rgba(255,255,255,.52)"
            >
              Vezetői riportok, eredménykimutatások, adókalkuláció és
              döntéstámogatás — a könyvelési adatok érthetőbb formában.
            </Text>

            <Flex mt={11} align="center" gap={5}>
              <Box w="42px" h="2px" bg={design.colors.champagne} />
              <Text fontSize="11px" color="rgba(255,255,255,.62)">
                Adatokból érthető információ.
              </Text>
            </Flex>
          </Box>

          <Box
            ref={dashboardRef}
            w="100%"
            maxW={{ base: "760px", lg: "none" }}
            opacity={chartVisible ? 1 : 0}
            transform={chartVisible ? "translate3d(0,0,0)" : "translate3d(0,34px,0)"}
            clipPath={chartVisible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)"}
            transition="opacity .7s ease, transform 1.05s cubic-bezier(.16,1,.3,1), clip-path 1.15s cubic-bezier(.16,1,.3,1)"
            willChange="opacity, transform, clip-path"
          >
            <Box
              border="1px solid rgba(255,255,255,.12)"
              bg="rgba(255,255,255,.025)"
            >

              <Grid
                templateColumns={{ base: "1fr 1fr", md: "repeat(3,1fr)" }}
                borderBottom="1px solid rgba(255,255,255,.09)"
              >
                {[
                  ["Árbevétel", "48,2 M Ft"],
                  ["Eredmény", "8,6 M Ft"],
                  ["Várható adófizetés", "2,1 M Ft"],
                ].map((metric, index) => (
                  <Box
                    key={metric[0]}
                    gridColumn={{ base: index === 2 ? "1 / -1" : "auto", md: "auto" }}
                    px={{ base: 5, md: 7 }}
                    py={7}
                    opacity={chartVisible ? 1 : 0}
                    transform={chartVisible ? "translateY(0)" : "translateY(10px)"}
                    transition={`opacity .55s ease ${0.28 + index * 0.08}s, transform .7s cubic-bezier(.16,1,.3,1) ${0.28 + index * 0.08}s`}
                    borderRight={{
                      base:
                        index === 0
                          ? "1px solid rgba(255,255,255,.09)"
                          : "none",
                      md:
                        index < 2
                          ? "1px solid rgba(255,255,255,.09)"
                          : "none",
                    }}
                    borderTop={{
                      base:
                        index === 2
                          ? "1px solid rgba(255,255,255,.09)"
                          : "none",
                      md: "none",
                    }}
                  >
                    <Text fontSize="10px" color="rgba(255,255,255,.38)">
                      {metric[0]}
                    </Text>
                    <Text
                      mt={3}
                      fontSize={{ base: "23px", md: "27px", xl: "30px" }}
                      fontWeight="500"
                      letterSpacing="-0.045em"
                      color="#FFFFFF"
                    >
                      {metric[1]}
                    </Text>
                    <Text
                      mt={2}
                      fontSize="10px"
                      color={
                        index === 2
                          ? design.colors.champagne
                          : "rgba(255,255,255,.4)"
                      }
                    >
                      {metric[2]}
                    </Text>
                  </Box>
                ))}
              </Grid>

              <Box px={{ base: 5, md: 7 }} pt={8} pb={6}>
                <Flex justify="space-between" align="center" mb={8}>
                  <Box>
                    <Text
                      fontSize="11px"
                      fontWeight="550"
                      color="rgba(255,255,255,.84)"
                    >
                      Árbevétel alakulása
                    </Text>
                    <Text mt="4px" fontSize="9px" color="rgba(255,255,255,.32)">
                      Mozgasd a kurzort a diagramon
                    </Text>
                  </Box>

                  <Flex align="center" gap={2}>
                    <Box w="18px" h="2px" bg={design.colors.champagne} />
                    <Text fontSize="9px" color="rgba(255,255,255,.4)">
                      Árbevétel
                    </Text>
                  </Flex>
                </Flex>

                <Box
                  position="relative"
                  h={{ base: "220px", md: "290px" }}
                  pr={{ base: "8px", md: "10px" }}
                  cursor={chartInteractive ? "crosshair" : "default"}
                  touchAction="pan-y"
                  pointerEvents={chartInteractive ? "auto" : "none"}
                  onPointerMove={handleChartPointer}
                  onPointerDown={handleChartPointer}
                  onPointerLeave={() => setActiveChartIndex(null)}
                >
                  <Box
                    position="absolute"
                    inset="0"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    pointerEvents="none"
                    opacity={chartVisible ? 1 : 0}
                    transition="opacity .55s ease .42s"
                  >
                    {[0, 1, 2, 3, 4].map((line) => (
                      <Box
                        key={line}
                        h="1px"
                        bg="rgba(255,255,255,.065)"
                      />
                    ))}
                  </Box>

                  {chartInteractive && activePoint && (
                    <>
                      <Box
                        position="absolute"
                        zIndex="2"
                        left={`${(activePoint.x / CHART_WIDTH) * 100}%`}
                        top="0"
                        bottom="0"
                        w="1px"
                        bg="rgba(255,255,255,.18)"
                        transform="translateX(-50%)"
                        pointerEvents="none"
                      />

                      <Box
                        position="absolute"
                        zIndex="6"
                        left={`${(activePoint.x / CHART_WIDTH) * 100}%`}
                        top={`${(activePoint.y / CHART_HEIGHT) * 100}%`}
                        transform={
                          activeChartIndex < 2
                            ? "translate(10px,-115%)"
                            : activeChartIndex > chartData.length - 3
                              ? "translate(calc(-100% - 10px),-115%)"
                              : "translate(-50%,-115%)"
                        }
                        minW="124px"
                        px={3}
                        py={2.5}
                        bg="#F7F4EE"
                        color={design.colors.ink}
                        pointerEvents="none"
                        boxShadow="0 14px 40px rgba(0,0,0,.22)"
                      >
                        <Text fontSize="9px" color={design.colors.muted}>
                          {chartData[activeChartIndex].label}
                        </Text>
                        <Text
                          mt="2px"
                          fontSize="14px"
                          fontWeight="650"
                          letterSpacing="-0.03em"
                        >
                          {chartData[activeChartIndex].value
                            .toFixed(1)
                            .replace(".", ",")} M Ft
                        </Text>
                      </Box>
                    </>
                  )}

                  <Box
                    as="svg"
                    position="absolute"
                    inset="0"
                    w="100%"
                    h="100%"
                    viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
                    preserveAspectRatio="none"
                    overflow="visible"
                    clipPath={chartVisible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)"}
                    transition="clip-path 1.45s cubic-bezier(.16,1,.3,1) .3s"
                    willChange="clip-path"
                  >
                    <defs>
                      <linearGradient id="financeAreaGold" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#B59A72"
                          stopOpacity=".2"
                        />
                        <stop
                          offset="100%"
                          stopColor="#B59A72"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>

                    <path
                      d={chartAreaPath}
                      fill="url(#financeAreaGold)"
                      opacity={chartVisible ? 1 : 0}
                      style={{ transition: "opacity 1s ease .6s" }}
                    />

                    <path
                      d={chartLinePath}
                      fill="none"
                      stroke={design.colors.champagne}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                      pathLength="100"
                      strokeDasharray="100"
                      strokeDashoffset={chartVisible ? "0" : "100"}
                      style={{
                        transition:
                          "stroke-dashoffset 1.55s cubic-bezier(.16,1,.3,1) .38s",
                      }}
                    />

                  </Box>

                  {chartPoints.map((point, index) => (
                    <Box
                      key={point.label}
                      position="absolute"
                      left={`${(point.x / CHART_WIDTH) * 100}%`}
                      top={`${(point.y / CHART_HEIGHT) * 100}%`}
                      transform="translate(-50%,-50%)"
                      w={activeChartIndex === index ? "12px" : "6px"}
                      h={activeChartIndex === index ? "12px" : "6px"}
                      borderRadius="50%"
                      bg={
                        activeChartIndex === index
                          ? "#F7F4EE"
                          : design.colors.champagne
                      }
                      border={activeChartIndex === index ? "3px solid" : "0 solid"}
                      borderColor={design.colors.champagne}
                      opacity={chartVisible ? 1 : 0}
                      transition={`opacity .35s ease ${0.72 + index * 0.055}s, width .2s ease, height .2s ease`}
                      pointerEvents="none"
                      zIndex={chartInteractive && activeChartIndex === index ? 4 : 3}
                    />
                  ))}
                </Box>

                <Flex mt={4} justify="space-between">
                  {[0, 2, 4, 6, 8, 11].map((index) => (
                    <Text
                      key={chartData[index].label}
                      fontSize="8px"
                      color="rgba(255,255,255,.3)"
                    >
                      {chartData[index].label}
                    </Text>
                  ))}
                </Flex>
              </Box>
            </Box>

            <Text
              mt={4}
              textAlign="right"
              fontSize="9px"
              color="rgba(255,255,255,.27)"
            >
              A megjelenített értékek kizárólag szemléltetési célú
              demonstrációs adatok.
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   ACCOUNTANT SWITCH
========================================================= */

function AccountantSwitchSection() {
  return (
    <Box
      id="konyvelovaltas"
      bg={design.colors.white}
      py={{ base: 24, md: 32, lg: 40 }}
    >
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: ".92fr 1.08fr" }}
          gap={{ base: 12, lg: 24, xl: 30 }}
          alignItems="start"
        >
          <Box position={{ lg: "sticky" }} top={{ lg: "120px" }}>
            <Box w="46px" h="3px" mb={9} bg={design.colors.champagne} />

            <Heading
              as="h2"
              maxW="620px"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "44px", sm: "52px", md: "66px", lg: "72px" }}
              fontWeight="500"
              lineHeight=".97"
              letterSpacing="-0.062em"
              color={design.colors.ink}
            >
              2027-et már
              <br />
              új könyvelővel
              <br />
              kezdené?
            </Heading>

            <Text
              mt={8}
              maxW="410px"
              fontSize={{ base: "15px", md: "16px" }}
              lineHeight="1.75"
              color={design.colors.muted}
            >
              A könyvelőváltást érdemes előre megtervezni. Az
              átadás-átvétel lépéseit átláthatóan végigvesszük, hogy az
              új együttműködés rendezett alapokról induljon.
            </Text>

            <Button
              as="a"
              href="/konyvelovaltas"
              mt={9}
              h="52px"
              px={8}
              borderRadius="0"
              bg={design.colors.ink}
              color={design.colors.white}
              fontSize="11px"
              fontWeight="600"
              transition="background .3s ease, color .3s ease, transform .3s ease"
              _hover={{
                bg: design.colors.champagne,
                color: design.colors.ink,
                transform: "translateY(-2px)",
              }}
            >
              Beszéljünk a könyvelőváltásról
            </Button>
          </Box>

          <Box borderTop="1px solid" borderColor={design.colors.border}>
            {switchSteps.map(([title, copy], index) => (
              <Grid
                key={title}
                templateColumns={{
                  base: "44px 1fr",
                  md: "72px .72fr 1fr",
                }}
                gap={{ base: 4, md: 8 }}
                py={{ base: 6, md: 7 }}
                borderBottom="1px solid"
                borderColor={design.colors.border}
                alignItems="start"
              >
                <Text
                  pt="3px"
                  fontSize="10px"
                  fontWeight="600"
                  color={design.colors.champagne}
                >
                  0{index + 1}
                </Text>

                <Text
                  fontSize={{ base: "16px", md: "17px" }}
                  fontWeight="600"
                  letterSpacing="-0.025em"
                  color={design.colors.ink}
                >
                  {title}
                </Text>

                <Text
                  gridColumn={{ base: "2", md: "auto" }}
                  maxW="390px"
                  fontSize="13px"
                  lineHeight="1.65"
                  color={design.colors.muted}
                >
                  {copy}
                </Text>
              </Grid>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   ABOUT
========================================================= */

function AboutSection() {
  return (
    <Box
      id="rolunk"
      bg="#F5F6F5"
      py={{ base: 22, md: 28, lg: 34 }}
    >
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: ".6fr 1.4fr" }}
          gap={{ base: 10, lg: 20 }}
          alignItems="start"
        >
          <Box>
            <Box w="34px" h="2px" bg={design.colors.champagne} mb={6} />
            <Text
              fontSize="12px"
              fontWeight="600"
              color={design.colors.graphite}
            >
              ODA-AZ-ADÓ
            </Text>
          </Box>

          <Box maxW="920px">
            <Heading
              as="h2"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "38px", sm: "46px", md: "56px", lg: "64px" }}
              fontWeight="500"
              lineHeight="1.02"
              letterSpacing="-0.055em"
              color={design.colors.ink}
            >
              Tapasztalat, amelyre
              <br />
              rendezett rendszer épül.
            </Heading>

            <Grid
              mt={{ base: 9, md: 11 }}
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={{ base: 6, md: 12 }}
            >
              <Text
                fontSize="15px"
                lineHeight="1.75"
                color={design.colors.graphite}
              >
                Több mint egy évtizede dolgozunk vállalkozások könyvelésén
                és adózásán.
              </Text>

              <Box>
                <Text
                  fontSize="14px"
                  lineHeight="1.75"
                  color={design.colors.muted}
                >
                  Debreceni jelenlétünkre építve online is együtt dolgozunk
                  az ország különböző pontjain működő vállalkozásokkal.
                </Text>

                <Text
                  as="a"
                  href="/rolunk"
                  display="inline-block"
                  position="relative"
                  mt={7}
                  pb="4px"
                  fontSize="11px"
                  fontWeight="600"
                  color={design.colors.ink}
                  _after={{
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    w: "100%",
                    h: "1px",
                    bg: design.colors.champagne,
                  }}
                >
                  Rólunk
                </Text>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   LOCATIONS
========================================================= */

function LocationsSection() {
  return (
    <Box bg={design.colors.white} py={{ base: 24, md: 32, lg: 40 }}>
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          pb={{ base: 14, md: 18, lg: 22 }}
          templateColumns={{ base: "1fr", lg: "1.15fr .85fr" }}
          gap={{ base: 8, lg: 20 }}
          alignItems="end"
        >
          <Heading
            as="h2"
            maxW="780px"
            fontFamily={design.fonts.sans}
            fontSize={{ base: "42px", sm: "50px", md: "62px", lg: "72px" }}
            fontWeight="500"
            lineHeight=".98"
            letterSpacing="-0.06em"
            color={design.colors.ink}
          >
            Helyben és
            <br />
            <Box as="span" color={design.colors.champagne}>
              online is.
            </Box>
          </Heading>

          <Text
            maxW="440px"
            justifySelf={{ lg: "end" }}
            fontSize={{ base: "15px", md: "16px" }}
            lineHeight="1.75"
            color={design.colors.muted}
          >
            Debrecenben személyes együttműködéssel vagyunk jelen. Budapesti
            és az ország más részein működő vállalkozásokkal online,
            digitális dokumentumkezeléssel dolgozunk együtt.
          </Text>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr", lg: "1.1fr .9fr" }}
          minH={{ lg: "690px", xl: "760px" }}
        >
          <Box
            position="relative"
            minH={{ base: "420px", md: "650px", lg: "auto" }}
            overflow="hidden"
            role="group"
          >
            <Image
              src="https://images.unsplash.com/photo-1705697356051-57e3943d932a?auto=format&fit=crop&w=1800&q=90"
              alt="Debreceni Nagytemplom"
              position="absolute"
              inset="0"
              w="100%"
              h="100%"
              objectFit="cover"
              objectPosition="center"
              filter="saturate(.72) contrast(1.02)"
              transition="transform 1.2s cubic-bezier(.16,1,.3,1), filter 1.2s ease"
              _groupHover={{
                transform: "scale(1.025)",
                filter: "saturate(.88) contrast(1.02)",
              }}
            />

            <Box
              position="absolute"
              inset="0"
              bg="linear-gradient(180deg, rgba(10,18,22,.42) 0%, rgba(10,18,22,.18) 26%, rgba(10,18,22,.82) 100%)"
            />

            <Flex
              position="absolute"
              inset="0"
              p={{ base: 5, md: 10, lg: 12 }}
              direction="column"
              justify="space-between"
            >
              <Flex
                align="center"
                gap={3}
                alignSelf="flex-start"
                px={3}
                py={2}
                bg="rgba(8,15,19,.42)"
                backdropFilter="blur(8px)"
                border="1px solid rgba(255,255,255,.14)"
                borderRadius="999px"
              >
                <Box w="28px" h="2px" bg={design.colors.champagne} />
                <Text fontSize="10px" color="rgba(255,255,255,.92)">
                  Személyes együttműködés
                </Text>
              </Flex>

              <Box>
                <Heading
                  as="h3"
                  fontFamily={design.fonts.sans}
                  fontSize={{ base: "34px", md: "56px", lg: "64px" }}
                  fontWeight="500"
                  letterSpacing="-0.055em"
                  color="#FFFFFF"
                >
                  Debrecen
                </Heading>

                <Text
                  mt={4}
                  maxW="370px"
                  fontSize={{ base: "14px", md: "15px" }}
                  lineHeight="1.7"
                  color="rgba(255,255,255,.7)"
                >
                  Meglévő helyi jelenlét és személyes együttműködési
                  lehetőség.
                </Text>
              </Box>
            </Flex>
          </Box>

          <Flex
            minH={{ base: "360px", lg: "auto" }}
            bg={design.colors.ink}
            color="#FFFFFF"
            direction="column"
            justify="space-between"
            p={{ base: 5, md: 10, lg: 12, xl: 14 }}
          >
            <Flex justify="space-between" align="flex-start">
              <Text fontSize="10px" color="rgba(255,255,255,.44)">
                Online együttműködés
              </Text>
              <Box w="38px" h="2px" bg={design.colors.champagne} />
            </Flex>

            <Box>
              <Heading
                as="h3"
                fontFamily={design.fonts.sans}
                fontSize={{ base: "34px", md: "54px", lg: "58px", xl: "64px" }}
                fontWeight="500"
                lineHeight=".98"
                letterSpacing="-0.055em"
                color="#FFFFFF"
              >
                Budapest és
                <br />
                <Box as="span" color={design.colors.champagne}>
                  országosan.
                </Box>
              </Heading>

              <Text
                mt={{ base: 5, md: 8 }}
                maxW="390px"
                fontSize="15px"
                lineHeight="1.75"
                color="rgba(255,255,255,.57)"
              >
                Online könyvelés, digitális dokumentumkezelés és folyamatos
                kapcsolattartás budapesti és országosan működő vállalkozások
                számára.
              </Text>
            </Box>

            <Grid
              pt={{ base: 6, md: 9 }}
              borderTop="1px solid rgba(255,255,255,.1)"
              templateColumns="1fr 1fr"
              gap={{ base: 5, md: 8 }}
            >
              <Box>
                <Text fontSize="10px" color="rgba(255,255,255,.32)">
                  Dokumentumkezelés
                </Text>
                <Text mt={3} fontSize="14px" color="rgba(255,255,255,.84)">
                  Digitálisan
                </Text>
              </Box>

              <Box>
                <Text fontSize="10px" color="rgba(255,255,255,.32)">
                  Együttműködés
                </Text>
                <Text mt={3} fontSize="14px" color="rgba(255,255,255,.84)">
                  Országosan
                </Text>
              </Box>
            </Grid>
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCta() {
  return (
    <Box
      id="kapcsolat"
      position="relative"
      bg={design.colors.ink}
      color="#FFFFFF"
      py={{ base: 24, md: 32, lg: 40, xl: 44 }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="3px"
        bg={design.colors.champagne}
      />

      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1.3fr .7fr" }}
          gap={{ base: 12, lg: 20 }}
          alignItems="end"
        >
          <Heading
            as="h2"
            maxW="900px"
            fontFamily={design.fonts.sans}
            fontSize={{ base: "50px", sm: "60px", md: "78px", lg: "92px", xl: "104px" }}
            fontWeight="500"
            lineHeight=".91"
            letterSpacing="-0.07em"
            color="#FFFFFF"
          >
            Legyen rendben
            <br />
            <Box as="span" color={design.colors.champagne}>
              a könyvelése.
            </Box>
          </Heading>

          <Box maxW="370px" justifySelf={{ lg: "end" }}>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              lineHeight="1.75"
              color="rgba(255,255,255,.56)"
            >
              Beszéljük át, milyen könyvelési és szakmai háttérre van
              szüksége vállalkozásának.
            </Text>

            <Button
              as="a"
              href="/kapcsolat"
              mt={8}
              h="54px"
              px={9}
              borderRadius="0"
              bg={design.colors.champagne}
              color={design.colors.ink}
              fontSize="11px"
              fontWeight="700"
              transition="background .3s ease, transform .3s ease"
              _hover={{
                bg: "#FFFFFF",
                transform: "translateY(-2px)",
              }}
            >
              Ajánlatot kérek
            </Button>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   FOOTER
========================================================= */

function SiteFooter() {
  return (
    <Box as="footer" bg={design.colors.ink} color="#FFFFFF">
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          py={{ base: 12, md: 16 }}
          borderTop="1px solid rgba(255,255,255,.1)"
          templateColumns={{ base: "1fr", md: "1.2fr .8fr .8fr" }}
          gap={{ base: 12, md: 10 }}
        >
          <Box>
            <Box w="34px" h="2px" mb={6} bg={design.colors.champagne} />
            <Text
              fontSize="20px"
              fontWeight="650"
              letterSpacing="-0.05em"
              color="#FFFFFF"
            >
              ODA-AZ-ADÓ
            </Text>
            <Text
              mt={5}
              maxW="330px"
              fontSize="12px"
              lineHeight="1.7"
              color="rgba(255,255,255,.42)"
            >
              Könyvelés és szakmai támogatás vállalkozásoknak.
            </Text>
          </Box>

          <Box>
            <Text mb={5} fontSize="10px" color="rgba(255,255,255,.3)">
              Oldalak
            </Text>

            {[
              ["Könyvelés", "/konyveles"],
              ["Adótanácsadás", "/szolgaltatasok/adotanacsadas"],
              ["Bérszámfejtés", "/szolgaltatasok/berelszamolas"],
              ["Rólunk", "/rolunk"],
              ["Könyvelőváltás", "/konyvelovaltas"],
              ["Kapcsolat", "/kapcsolat"],
            ].map(([label, href]) => (
              <Text
                key={label}
                as="a"
                href={href}
                display="block"
                mb={3}
                fontSize="12px"
                color="rgba(255,255,255,.64)"
                transition={design.transition}
                _hover={{ color: design.colors.champagne }}
              >
                {label}
              </Text>
            ))}
          </Box>

          <Box>
            <Text mb={5} fontSize="10px" color="rgba(255,255,255,.3)">
              ODA-AZ-ADÓ Kft.
            </Text>
            <Text
              fontSize="12px"
              lineHeight="1.8"
              color="rgba(255,255,255,.58)"
            >
              4026 Debrecen
              <br />
              Csokonai utca 4. 3/7.
            </Text>
          </Box>
        </Grid>

        <Flex
          py={6}
          borderTop="1px solid rgba(255,255,255,.08)"
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          gap={4}
        >
          <Text fontSize="9px" color="rgba(255,255,255,.26)">
            © 2026 ODA-AZ-ADÓ Kft.
          </Text>

          <Flex gap={6}>
            <Text
              as="a"
              href="/adatkezeles"
              fontSize="9px"
              color="rgba(255,255,255,.34)"
              _hover={{ color: design.colors.champagne }}
            >
              Adatkezelés
            </Text>
            <Text
              as="a"
              href="/kapcsolat"
              fontSize="9px"
              color="rgba(255,255,255,.34)"
              _hover={{ color: design.colors.champagne }}
            >
              Kapcsolat
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
