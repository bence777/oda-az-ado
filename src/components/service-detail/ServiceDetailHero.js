import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";
import ServiceHeroVisual from "./ServiceHeroVisual";

export default function ServiceDetailHero({ service }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Section pt={{ base: 14, md: 18, lg: 22 }} pb={{ base: 18, md: 24, lg: 30 }} bg={design.colors.white} overflow="hidden">
      <PageContainer>
        <Flex align="center" gap={3} mb={{ base: 10, md: 14 }} fontSize="10px" fontWeight="600" letterSpacing=".12em" textTransform="uppercase">
          <Text as="a" href="/szolgaltatasok" color={design.colors.quiet}>Szolgáltatások</Text>
          <Box w="22px" h="1px" bg={design.colors.border} />
          <Text color={design.colors.champagne}>{service.name}</Text>
        </Flex>

        <Grid templateColumns={{ base: "1fr", lg: "minmax(0,1.04fr) minmax(420px,.96fr)" }} gap={{ base: 12, lg: 18, xl: 24 }} alignItems="stretch">
          <Flex direction="column" justify="space-between" minH={{ lg: "560px" }} opacity={mounted ? 1 : 0} transform={mounted ? "translateY(0)" : "translateY(34px)"} transition="opacity .9s ease .12s, transform 1s cubic-bezier(.16,1,.3,1) .12s">
            <Box>
              <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>{service.eyebrow}</Text>
              <Heading as="h1" mt={{ base: 5, md: 7 }} maxW="920px" fontSize={{ base: "48px", sm: "60px", md: "74px", lg: "80px", xl: "92px" }} fontWeight="500" lineHeight=".93" letterSpacing="-.068em" color={design.colors.ink}>{service.title}</Heading>
              <Text mt={{ base: 7, md: 9 }} maxW="690px" fontSize={{ base: "16px", md: "17px" }} lineHeight="1.72" color={design.colors.muted}>{service.description}</Text>
            </Box>

            <Box mt={{ base: 9, lg: 12 }}>
              <Flex gap={5} align="center" wrap="wrap">
                <Button as="a" href="/kapcsolat#ajanlatkeres" h="50px" px={7} borderRadius="0" bg={design.colors.ink} color="#fff" fontSize="11px" fontWeight="650" _hover={{ bg: design.colors.champagne, color: design.colors.ink }}>Ajánlatot kérek</Button>
                <Text as="a" href="#reszletek" pb="4px" borderBottom="1px solid" borderColor={design.colors.champagne} fontSize="11px" fontWeight="600" color={design.colors.ink}>Mit tartalmaz?</Text>
              </Flex>
              <Flex mt={8} pt={5} borderTop="1px solid" borderColor={design.colors.border} justify="space-between" gap={6} wrap="wrap">
                <Text fontSize={{ base: "30px", md: "38px" }} fontWeight="500" lineHeight="1" letterSpacing="-.055em" color={design.colors.ink}>{service.number}</Text>
                <Text maxW="390px" fontSize="10px" lineHeight="1.55" letterSpacing=".08em" textTransform="uppercase" color={design.colors.quiet}>{service.locations}</Text>
              </Flex>
            </Box>
          </Flex>

          <Box overflow="hidden" clipPath={mounted ? "inset(0 0 0 0)" : "inset(0 0 100% 0)"} transition="clip-path 1.2s cubic-bezier(.16,1,.3,1) .26s">
            <ServiceHeroVisual slug={service.slug} />
          </Box>
        </Grid>
      </PageContainer>
    </Section>
  );
}
