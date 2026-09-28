import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

export default function AboutHero() {
  return (
    <Section pt={{ base: 14, md: 18, lg: 24 }} pb={{ base: 18, md: 24, lg: 30 }}>
      <PageContainer>
        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(0,1.5fr) minmax(290px,.5fr)" }}
          gap={{ base: 10, lg: 16, xl: 24 }}
          alignItems="end"
        >
          <Box>
            <Flex align="center" gap={4} mb={{ base: 7, md: 9 }}>
              <Box w="34px" h="2px" bg={design.colors.champagne} />
              <Text
                fontSize="10px"
                fontWeight="600"
                letterSpacing=".16em"
                textTransform="uppercase"
                color={design.colors.muted}
              >
                Rólunk
              </Text>
            </Flex>

            <Heading
              as="h1"
              maxW="1080px"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "50px", sm: "62px", md: "78px", lg: "88px", xl: "98px" }}
              fontWeight="500"
              lineHeight=".94"
              letterSpacing="-.068em"
              color={design.colors.ink}
            >
              A jó könyvelés mögött nem kapkodás, hanem{" "}
              <Box as="span" color={design.colors.champagne}>
                rendszer van.
              </Box>
            </Heading>
          </Box>

          <Box maxW="380px" pb={{ lg: 2 }}>
            <Text
              fontSize={{ base: "16px", md: "17px" }}
              lineHeight="1.68"
              letterSpacing="-.02em"
              color={design.colors.graphite}
            >
              Több mint egy évtizede dolgozunk vállalkozások könyvelésén és
              adózásán. A tapasztalatunkat ma olyan működés támogatja, amelyben
              az információk, feladatok és határidők követhetők maradnak.
            </Text>

            <Text
              mt={8}
              pt={5}
              borderTop="1px solid"
              borderColor={design.colors.border}
              fontSize="10px"
              fontWeight="600"
              letterSpacing=".12em"
              textTransform="uppercase"
              color={design.colors.muted}
            >
              Debrecen · Budapest · online országosan
            </Text>
          </Box>
        </Grid>

        <Box
          mt={{ base: 14, md: 18, lg: 24 }}
          ml={{ base: 0, lg: "14%" }}
          position="relative"
          bg={design.colors.ink}
          minH={{ base: "300px", md: "390px", lg: "470px" }}
          overflow="hidden"
        >
          <Box
            position="absolute"
            inset="0"
            opacity=".9"
            background="radial-gradient(circle at 76% 30%, rgba(177,138,85,.26) 0, rgba(177,138,85,0) 27%), linear-gradient(125deg, #102633 0%, #132d3b 55%, #0d202b 100%)"
          />
          <Box
            position="absolute"
            top={{ base: 8, md: 12 }}
            right={{ base: 8, md: 12 }}
            w={{ base: "88px", md: "140px" }}
            h={{ base: "88px", md: "140px" }}
            borderTop="1px solid rgba(255,255,255,.14)"
            borderRight="1px solid rgba(255,255,255,.14)"
          />
          <Box
            position="absolute"
            left={{ base: 7, md: 11, lg: 14 }}
            bottom={{ base: 8, md: 12, lg: 14 }}
            maxW={{ base: "270px", md: "600px", lg: "760px" }}
          >
            <Text
              fontSize={{ base: "13px", md: "15px" }}
              lineHeight="1.65"
              color="rgba(255,255,255,.56)"
            >
              A cél nem az, hogy a könyvelés minél több figyelmet kérjen.
            </Text>
            <Text
              mt={2}
              fontSize={{ base: "25px", md: "36px", lg: "44px" }}
              lineHeight="1.08"
              letterSpacing="-.045em"
              color="#FFFFFF"
            >
              Hanem az, hogy a vállalkozás pénzügyi háttere rendezett legyen,
              és erre nyugodtan lehessen építeni.
            </Text>
          </Box>
        </Box>
      </PageContainer>
    </Section>
  );
}
