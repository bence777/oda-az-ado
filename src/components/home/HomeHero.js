import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";

export default function HomeHero() {
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
    <Box>
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          pt={{ base: 14, md: 18, lg: 20, xl: 24 }}
          templateColumns={{
            base: "1fr",
            lg: "minmax(0, 1.55fr) minmax(300px, .45fr)",
          }}
          gap={{ base: 9, md: 12, lg: 16, xl: 24 }}
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
              color={design.colors.ink}
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
              color={design.colors.graphite}
            >
              Pontos könyvelés és szakmai támogatás azoknak, akik
              nemcsak tudni, hanem{" "}
              <Box as="span" color={design.colors.muted}>
                érteni is szeretnék a számokat.
              </Box>
            </Text>

            <Flex mt={{ base: 7, md: 9 }} align="center" gap={6} wrap="wrap">
              <Button
                as="a"
                href="#kapcsolat"
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
                Ajánlatot kérek
              </Button>

              <Text
                as="a"
                href="#mukodes"
                position="relative"
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
                Megnézem, hogyan dolgozunk
              </Text>
            </Flex>
          </Box>
        </Grid>
      </Container>

      <Box ref={visualRef} position="relative" mt={{ base: 14, md: 16, lg: 18 }}>
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

