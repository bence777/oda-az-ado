import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";
import { serviceFlow } from "../../data/services";

export default function ServiceSystemSection() {
  return (
    <Section py={{ base: 22, md: 30, lg: 38 }} bg={design.colors.ink} color="#fff" overflow="hidden">
      <PageContainer>
        <Grid templateColumns={{ base: "1fr", lg: ".82fr 1.18fr" }} gap={{ base: 12, lg: 22 }} alignItems="end">
          <Box>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Egy adatút</Text>
            <Heading as="h2" mt={6} maxW="720px" fontSize={{ base: "42px", md: "60px", lg: "72px" }} fontWeight="500" lineHeight=".97" letterSpacing="-.062em" color="#fff">Az adat nem áll meg a könyvelésnél.</Heading>
          </Box>
          <Text maxW="590px" justifySelf={{ lg: "end" }} fontSize="14px" lineHeight="1.8" color="rgba(255,255,255,.52)">Ugyanabból a rendezett háttérből lehet bevallás, adózási döntés, bérinformáció és vezetői összefoglaló. Nem több adminisztrációt építünk, hanem ugyanazt az alapot használjuk jobban.</Text>
        </Grid>

        <Box mt={{ base: 14, md: 18, lg: 22 }} position="relative">
          <Box display={{ base: "none", md: "block" }} position="absolute" left="0" right="0" top="52px" h="1px" bg="rgba(255,255,255,.18)" />
          <Grid templateColumns={{ base: "1fr", md: "repeat(4,1fr)" }} gap={{ base: 0, md: 8 }}>
            {serviceFlow.map((item, index) => (
              <Box key={item.title} py={{ base: 6, md: 0 }} borderTop={{ base: index ? "1px solid rgba(255,255,255,.14)" : "0", md: "0" }} position="relative">
                <Box w="13px" h="13px" borderRadius="50%" bg={index === serviceFlow.length - 1 ? design.colors.champagne : design.colors.ink} border="1px solid" borderColor={index === serviceFlow.length - 1 ? design.colors.champagne : "rgba(255,255,255,.35)"} position={{ md: "relative" }} zIndex="1" mt={{ md: "46px" }} />
                <Text mt={{ base: 0, md: 8 }} fontSize="9px" color={design.colors.champagne}>0{index + 1}</Text>
                <Text mt={3} fontSize={{ base: "22px", md: "25px" }} fontWeight="500" letterSpacing="-.04em">{item.title}</Text>
                <Text mt={4} maxW="290px" fontSize="11px" lineHeight="1.72" color="rgba(255,255,255,.48)">{item.text}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </PageContainer>
    </Section>
  );
}
