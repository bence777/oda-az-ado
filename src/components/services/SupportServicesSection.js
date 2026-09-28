import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";
import { supportingServices } from "../../data/services";

export default function SupportServicesSection() {
  return (
    <Section py={{ base: 20, md: 28, lg: 34 }} bg={design.colors.white}>
      <PageContainer>
        <Grid templateColumns={{ base: "1fr", lg: ".82fr 1.18fr" }} gap={{ base: 12, lg: 20 }} alignItems="start">
          <Box position={{ lg: "sticky" }} top={{ lg: "130px" }}>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Kapcsolódó feladatok</Text>
            <Heading as="h2" mt={6} maxW="650px" fontSize={{ base: "40px", md: "56px", lg: "66px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.06em" color={design.colors.ink}>Van, amit nem érdemes külön szolgáltatássá fújni.</Heading>
            <Text mt={7} maxW="560px" fontSize="14px" lineHeight="1.8" color={design.colors.muted}>Ezek a feladatok helyzettől függően kapcsolódnak a könyvelési és adózási együttműködéshez. Nem újabb csomagként, hanem a szükséges szakmai háttér részeként.</Text>
          </Box>

          <Grid templateColumns={{ base: "1fr", md: "1.08fr .92fr" }} gap={{ base: 6, md: 8 }}>
            <Box gridRow={{ md: "span 2" }} bg={design.colors.ink} color="#fff" p={{ base: 7, md: 9 }} minH={{ md: "440px" }} display="flex" flexDirection="column" justifyContent="space-between">
              <Box>
                <Text fontSize="9px" letterSpacing=".13em" textTransform="uppercase" color={design.colors.champagne}>Szükség esetén</Text>
                <Heading as="h3" mt={5} fontSize={{ base: "32px", md: "42px" }} fontWeight="500" lineHeight="1.02" letterSpacing="-.05em">{supportingServices[1].title}</Heading>
              </Box>
              <Text maxW="470px" fontSize="13px" lineHeight="1.8" color="rgba(255,255,255,.55)">{supportingServices[1].text}</Text>
            </Box>

            <Box p={{ base: 6, md: 7 }} bg={design.colors.offWhite} minH={{ md: "210px" }}>
              <Text fontSize="9px" color={design.colors.champagne}>Magánszemély</Text>
              <Text mt={5} fontSize={{ base: "23px", md: "27px" }} fontWeight="600" letterSpacing="-.04em" color={design.colors.ink}>{supportingServices[0].title}</Text>
              <Text mt={4} fontSize="11px" lineHeight="1.72" color={design.colors.muted}>{supportingServices[0].text}</Text>
            </Box>

            <Box p={{ base: 6, md: 7 }} border="1px solid" borderColor={design.colors.border} minH={{ md: "210px" }}>
              <Text fontSize="9px" color={design.colors.champagne}>Működési háttér</Text>
              <Text mt={5} fontSize={{ base: "23px", md: "27px" }} fontWeight="600" letterSpacing="-.04em" color={design.colors.ink}>{supportingServices[2].title}</Text>
              <Text mt={4} fontSize="11px" lineHeight="1.72" color={design.colors.muted}>{supportingServices[2].text}</Text>
            </Box>

            <Box gridColumn={{ md: "1 / -1" }} px={{ base: 6, md: 8 }} py={{ base: 7, md: 8 }} borderTop="1px solid" borderBottom="1px solid" borderColor={design.colors.border}>
              <Grid templateColumns={{ base: "1fr", md: ".72fr 1.28fr" }} gap={{ base: 4, md: 8 }} alignItems="center">
                <Text fontSize={{ base: "22px", md: "27px" }} fontWeight="600" letterSpacing="-.04em" color={design.colors.ink}>{supportingServices[3].title}</Text>
                <Text fontSize="12px" lineHeight="1.75" color={design.colors.muted}>{supportingServices[3].text}</Text>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </PageContainer>
    </Section>
  );
}
