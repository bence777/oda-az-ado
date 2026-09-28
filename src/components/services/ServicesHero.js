import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

export default function ServicesHero() {
  return (
    <Section pt={{ base: 14, md: 18, lg: 22 }} pb={{ base: 18, md: 24, lg: 30 }} overflow="hidden">
      <PageContainer>
        <Grid templateColumns={{ base: "1fr", lg: "1.05fr .95fr" }} gap={{ base: 12, lg: 18, xl: 24 }} alignItems="stretch">
          <Flex direction="column" justify="space-between" minH={{ lg: "620px" }}>
            <Box>
              <Flex align="center" gap={4} mb={7}>
                <Box w="34px" h="2px" bg={design.colors.champagne} />
                <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.muted}>Szolgáltatások</Text>
              </Flex>
              <Heading as="h1" maxW="980px" fontSize={{ base: "50px", sm: "62px", md: "78px", lg: "88px", xl: "100px" }} fontWeight="500" lineHeight=".92" letterSpacing="-.07em" color={design.colors.ink}>
                Nem szolgáltatáslistát adunk. <Box as="span" color={design.colors.champagne}>Pénzügyi hátteret.</Box>
              </Heading>
              <Text mt={8} maxW="690px" fontSize={{ base: "16px", md: "18px" }} lineHeight="1.72" color={design.colors.graphite}>
                A könyvelés, az adózás, a bérszámfejtés és a vezetői információ ugyanannak a vállalkozásnak négy nézőpontja. Ezért nem külön csomagokban, hanem egymásra épülő szakmai háttérben gondolkodunk.
              </Text>
            </Box>

            <Grid mt={{ base: 10, lg: 14 }} templateColumns={{ base: "1fr 1fr", md: "repeat(4,1fr)" }} gap="1px" bg={design.colors.border} border="1px solid" borderColor={design.colors.border}>
              {["Könyvelés", "Adó", "Bér", "Vezetői kép"].map((label, index) => (
                <Box key={label} bg={design.colors.white} px={{ base: 4, md: 5 }} py={{ base: 4, md: 5 }} minH="92px">
                  <Text fontSize="9px" color={design.colors.champagne}>0{index + 1}</Text>
                  <Text mt={4} fontSize={{ base: "14px", md: "15px" }} fontWeight="600" color={design.colors.ink}>{label}</Text>
                </Box>
              ))}
            </Grid>
          </Flex>

          <Box position="relative" minH={{ base: "520px", md: "620px" }} bg={design.colors.ink} overflow="hidden">
            <Box position="absolute" inset="0" backgroundImage="linear-gradient(180deg,rgba(16,38,51,.08),rgba(16,38,51,.82)), url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&fm=jpg&q=84&w=1800')" backgroundSize="cover" backgroundPosition="center" />
            <Box position="absolute" inset={{ base: 5, md: 7 }} border="1px solid rgba(255,255,255,.18)" />
            <Box position="absolute" left={{ base: 7, md: 9 }} right={{ base: 7, md: 9 }} bottom={{ base: 7, md: 9 }} color="#fff">
              <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Egy vállalkozás · egy összefüggő kép</Text>
              <Text mt={4} maxW="560px" fontSize={{ base: "30px", md: "43px" }} lineHeight="1.04" letterSpacing="-.052em">
                A jó háttér nem látványosan bonyolult. Hanem csendben összetartja a működést.
              </Text>
            </Box>
          </Box>
        </Grid>

        <Flex mt={{ base: 12, md: 16 }} pt={5} borderTop="1px solid" borderColor={design.colors.border} justify="space-between" gap={6} wrap="wrap">
          <Text fontSize="10px" fontWeight="600" letterSpacing=".12em" textTransform="uppercase" color={design.colors.muted}>Debrecen · Budapest · online országosan</Text>
          <Text fontSize="10px" color={design.colors.quiet}>Egyedi ajánlat · nincs csomagár</Text>
        </Flex>
      </PageContainer>
    </Section>
  );
}
