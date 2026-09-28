import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

const principles = [
  [
    "Szakmai felelősségbiztosítás",
    "A szakmai munkát biztosítási háttér támogatja. A felelősség nem kommunikációs elem, hanem a működés része.",
  ],
  [
    "Folyamatos szakmai figyelem",
    "Az adózás és a szabályozási környezet változik. A szakmai tudásnak ezekkel együtt kell haladnia.",
  ],
  [
    "Határidők és ellenőrzés",
    "A rendezett működés alapja, hogy a feladatoknak helyük, státuszuk és határidejük van.",
  ],
  [
    "Érthető információ",
    "A könyvelési adat akkor használható, ha nemcsak elkészül, hanem a vállalkozás vezetője érti is.",
  ],
];

export default function PrinciplesSection() {
  return (
    <Section bg={design.colors.ink} color="#FFFFFF" py={{ base: 20, md: 28, lg: 34 }}>
      <PageContainer>
        <Grid
          templateColumns={{ base: "1fr", lg: ".72fr 1.28fr" }}
          gap={{ base: 12, lg: 18, xl: 24 }}
        >
          <Box>
            <Box w="34px" h="2px" bg={design.colors.champagne} mb={6} />
            <Text
              maxW="230px"
              fontSize="10px"
              fontWeight="600"
              letterSpacing=".16em"
              textTransform="uppercase"
              color="rgba(255,255,255,.48)"
            >
              Ami a háttérben tartja a rendszert
            </Text>
          </Box>

          <Box>
            <Heading
              as="h2"
              maxW="920px"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "39px", md: "54px", lg: "64px" }}
              fontWeight="500"
              lineHeight="1.01"
              letterSpacing="-.055em"
              color="#FFFFFF"
            >
              A szakmai háttér nem feltétlenül látványos. Az eredménye viszont az.
            </Heading>

            <Box mt={{ base: 12, md: 16 }} borderTop="1px solid rgba(255,255,255,.16)">
              {principles.map(([title, text], index) => (
                <Grid
                  key={title}
                  py={{ base: 7, md: 9 }}
                  borderBottom="1px solid rgba(255,255,255,.14)"
                  templateColumns={{ base: "42px 1fr", md: "66px .8fr 1.2fr" }}
                  gap={{ base: 4, md: 8 }}
                  alignItems="start"
                >
                  <Text fontSize="10px" color={design.colors.champagne}>
                    0{index + 1}
                  </Text>
                  <Text
                    fontSize={{ base: "19px", md: "21px" }}
                    lineHeight="1.3"
                    letterSpacing="-.025em"
                    color="#FFFFFF"
                  >
                    {title}
                  </Text>
                  <Text
                    gridColumn={{ base: "2", md: "auto" }}
                    fontSize="13px"
                    lineHeight="1.75"
                    color="rgba(255,255,255,.5)"
                  >
                    {text}
                  </Text>
                </Grid>
              ))}
            </Box>
          </Box>
        </Grid>
      </PageContainer>
    </Section>
  );
}
