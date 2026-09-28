import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

const accents = {
  adotanacsadas: "#E9E2D7",
  berszamfejtes: "#F3EFE7",
  "vezetoi-informacio": "#E6EAEB",
  "konyveles-budapest": "#F1ECE3",
  konyvelovaltas: "#F4F1EA",
};

export default function ServiceInsightSection({ service }) {
  const bg = accents[service.slug] || design.colors.white;
  return (
    <Section py={{ base: 20, md: 28, lg: 36 }} bg={bg}>
      <PageContainer>
        <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>{service.insightEyebrow}</Text>
        <Grid mt={6} templateColumns={{ base: "1fr", lg: "1.25fr .75fr" }} gap={{ base: 10, lg: 18 }} alignItems="end">
          <Heading as="h2" maxW="980px" fontSize={{ base: "42px", md: "60px", lg: "74px" }} fontWeight="500" lineHeight=".96" letterSpacing="-.064em" color={design.colors.ink}>{service.insightTitle}</Heading>
          <Text maxW="520px" justifySelf={{ lg: "end" }} fontSize={{ base: "14px", md: "15px" }} lineHeight="1.82" color={design.colors.muted}>{service.insightText}</Text>
        </Grid>
        <Flex mt={{ base: 10, md: 14 }} pt={6} borderTop="1px solid" borderColor="rgba(16,38,51,.18)" gapX={{ base: 6, md: 10 }} gapY={4} wrap="wrap">
          {service.insightItems.map((item,index)=><Text key={item} fontSize={{ base: "12px", md: "13px" }} lineHeight="1.55" color={design.colors.graphite}><Box as="span" color={design.colors.champagne} mr={2}>{String(index+1).padStart(2,'0')}</Box>{item}</Text>)}
        </Flex>
      </PageContainer>
    </Section>
  );
}
