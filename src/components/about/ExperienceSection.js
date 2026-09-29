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
              15+
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
              15+ év szakmai tapasztalat, konkrét szakmai háttérrel.
            </Heading>

            <Grid
              mt={{ base: 9, md: 12 }}
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={{ base: 6, md: 12 }}
            >
              <Text fontSize="15px" lineHeight="1.78" color={design.colors.graphite}>
                Okleveles közgazdász · számvitel mesterszak, mérlegképes könyvelő
                és adótanácsadó szakmai háttérrel dolgozunk.
              </Text>
              <Text fontSize="14px" lineHeight="1.78" color={design.colors.muted}>
                A szakmai munkát 5 M Ft/káresemény felelősségbiztosítás támogatja.
                A cél nem pusztán a kötelező feladatok teljesítése, hanem a rendezett,
                kontrollált és érthető pénzügyi háttér.
              </Text>
            </Grid>
          </Box>
        </Grid>
      </PageContainer>
    </Section>
  );
}
