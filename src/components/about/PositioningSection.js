import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

export default function PositioningSection() {
  return (
    <Section py={{ base: 20, md: 28, lg: 34 }}>
      <PageContainer>
        <Grid
          templateColumns={{ base: "1fr", lg: ".72fr 1.28fr" }}
          gap={{ base: 10, lg: 18, xl: 24 }}
          alignItems="start"
        >
          <Box position={{ lg: "sticky" }} top={{ lg: "40px" }}>
            <Box w="34px" h="2px" bg={design.colors.champagne} mb={6} />
            <Text
              fontSize="10px"
              fontWeight="600"
              letterSpacing=".16em"
              textTransform="uppercase"
              color={design.colors.muted}
            >
              Szemlélet
            </Text>
          </Box>

          <Box>
            <Heading
              as="h2"
              maxW="960px"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "40px", md: "56px", lg: "68px" }}
              fontWeight="500"
              lineHeight=".99"
              letterSpacing="-.06em"
              color={design.colors.ink}
            >
              Nem szeretnénk nagyobbnak látszani, mint amekkorák vagyunk.
            </Heading>

            <Grid
              mt={{ base: 12, md: 16 }}
              borderTop="1px solid"
              borderColor={design.colors.border}
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            >
              <Box
                py={{ base: 8, md: 10 }}
                pr={{ md: 10 }}
                borderBottom={{ base: "1px solid", md: "0" }}
                borderRight={{ md: "1px solid" }}
                borderColor={design.colors.border}
              >
                <Text
                  fontSize={{ base: "24px", md: "30px" }}
                  lineHeight="1.16"
                  letterSpacing="-.04em"
                  color={design.colors.ink}
                >
                  Személyesebb iroda, közvetlenebb felelősség.
                </Text>
              </Box>
              <Box py={{ base: 8, md: 10 }} pl={{ md: 10 }}>
                <Text fontSize="15px" lineHeight="1.8" color={design.colors.graphite}>
                  Abban hiszünk, hogy egy könyvelőirodának ismernie kell azokat a
                  vállalkozásokat, amelyekért felelősséget vállal. Ezért számunkra
                  fontosabb a követhető együttműködés és a szakmai minőség, mint az
                  ügyfélszám önmagában.
                </Text>
              </Box>
            </Grid>

            <Box
              mt={{ base: 10, md: 14 }}
              pl={{ base: 6, md: 10 }}
              borderLeft="2px solid"
              borderColor={design.colors.champagne}
              maxW="920px"
            >
              <Text
                fontSize={{ base: "27px", md: "38px" }}
                lineHeight="1.2"
                letterSpacing="-.04em"
                color={design.colors.ink}
              >
                Nem az a cél, hogy minden vállalkozással együtt dolgozzunk. Az a
                cél, hogy akikkel együtt dolgozunk, azok mögött rendezett rendszer
                legyen.
              </Text>
            </Box>
          </Box>
        </Grid>
      </PageContainer>
    </Section>
  );
}
