import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

export default function ExperienceSection() {
  return (
    <Section bg={design.colors.offWhite} py={{ base: 20, md: 26, lg: 32 }}>
      <PageContainer>
        <Grid
          templateColumns={{ base: "1fr", lg: ".62fr 1.38fr" }}
          gap={{ base: 12, lg: 18, xl: 24 }}
        >
          <Box>
            <Text
              fontSize={{ base: "74px", md: "96px", lg: "118px" }}
              fontWeight="500"
              lineHeight=".82"
              letterSpacing="-.075em"
              color={design.colors.champagne}
            >
              10+
            </Text>
            <Text
              mt={5}
              maxW="240px"
              fontSize="12px"
              lineHeight="1.6"
              color={design.colors.muted}
            >
              év szakmai tapasztalat vállalkozások könyvelésében és adózásában
            </Text>
          </Box>

          <Box maxW="920px">
            <Heading
              as="h2"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "38px", md: "52px", lg: "62px" }}
              fontWeight="500"
              lineHeight="1.02"
              letterSpacing="-.055em"
              color={design.colors.ink}
            >
              Több mint egy évtized ugyanazon az oldalon: a vállalkozásokén.
            </Heading>

            <Grid
              mt={{ base: 9, md: 12 }}
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={{ base: 6, md: 12 }}
            >
              <Text fontSize="15px" lineHeight="1.78" color={design.colors.graphite}>
                Az évek alatt változtak a szabályok, a technológia és az ügyfelek
                elvárásai. A pontos munka, az elérhetőség és a felelősség azonban
                nem lett kevésbé fontos.
              </Text>
              <Text fontSize="14px" lineHeight="1.78" color={design.colors.muted}>
                A könyvelés számunkra nem dokumentumok lezárását jelenti. Olyan
                pénzügyi hátteret építünk, amelyből a vállalkozás vezetője érthető,
                használható információt kap.
              </Text>
            </Grid>
          </Box>
        </Grid>
      </PageContainer>
    </Section>
  );
}
