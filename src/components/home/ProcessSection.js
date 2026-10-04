import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";
import { processSteps } from "../../data/home";

export default function ProcessSection() {
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
      bg="#F5F0E8"
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

          <Box maxW="400px" justifySelf={{ md: "end" }}>
            <Text
              fontSize="13px"
              lineHeight="1.7"
              color={design.colors.muted}
            >
              A cél nem a technológia önmagában, hanem a rendezett,
              követhető és visszakereshető könyvelési háttér.
            </Text>
            <Text
              as="a"
              href="/mukodesunk"
              display="inline-block"
              mt={5}
              pb="4px"
              borderBottom="1px solid"
              borderColor={design.colors.champagne}
              fontSize="11px"
              fontWeight="600"
              color={design.colors.ink}
            >
              Működésünk részletesen
            </Text>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
