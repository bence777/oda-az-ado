import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

export default function ServiceDetailCta({ service }) {
  return (
    <Section
      position="relative"
      py={{ base: 24, md: 32, lg: 38 }}
      bg={design.colors.ink}
      color="#FFFFFF"
      overflow="hidden"
    >
      <Box position="absolute" top="0" left="0" w="100%" h="3px" bg={design.colors.champagne} />
      <PageContainer>
        <Grid
          templateColumns={{ base: "1fr", lg: "1.3fr .7fr" }}
          gap={{ base: 12, lg: 20 }}
          alignItems="end"
        >
          <Box>
            <Text
              fontSize="10px"
              fontWeight="600"
              letterSpacing=".16em"
              textTransform="uppercase"
              color={design.colors.champagne}
            >
              Következő lépés
            </Text>
            <Heading
              as="h2"
              mt={6}
              maxW="980px"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "46px", md: "66px", lg: "82px" }}
              fontWeight="500"
              lineHeight=".95"
              letterSpacing="-.065em"
              color="#FFFFFF"
            >
              {service.ctaTitle}
            </Heading>
          </Box>

          <Box maxW="410px" justifySelf={{ lg: "end" }}>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              lineHeight="1.75"
              color="rgba(255,255,255,.56)"
            >
              {service.ctaText}
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
              _hover={{ bg: "#FFFFFF", transform: "translateY(-2px)" }}
            >
              Ajánlatot kérek
            </Button>
          </Box>
        </Grid>
      </PageContainer>
    </Section>
  );
}
