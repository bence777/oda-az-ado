import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";
import ContactForm from "./ContactForm";

export default function ContactFormSection() {
  return (
    <Box id="ajanlatkeres" py={{ base: 22, md: 30, lg: 38 }} bg={design.colors.offWhite}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: ".72fr 1.28fr" }} gap={{ base: 12, lg: 20, xl: 26 }} alignItems="start">
          <Box position={{ lg: "sticky" }} top={{ lg: "42px" }}>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Kapcsolatfelvétel</Text>
            <Heading as="h2" mt={6} maxW="560px" fontSize={{ base: "40px", md: "56px", lg: "66px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.058em" color={design.colors.ink}>
              Pár adatból már látjuk, <Box as="span" color={design.colors.graphite}>hogyan érdemes továbbmenni.</Box>
            </Heading>
            <Text mt={7} maxW="500px" fontSize="15px" lineHeight="1.8" color={design.colors.muted}>
              Az űrlap az ajánlat előkészítéséhez szükséges alapadatokat kéri be. Nem kérünk főkönyvi kivonatot, szerződést vagy korábbi könyvelési anyagot az első kapcsolatfelvételkor.
            </Text>
            <Grid mt={10} templateColumns="1fr 1fr" gap={4}>
              {[['Strukturált előminősítés','a szükséges alapadatok egy helyen'],['Dokumentum nélkül','az első kapcsolatfelvételhez nem kell feltöltés']].map(([a,b])=><Box key={a} p={5} bg={design.colors.white} border="1px solid" borderColor={design.colors.border}><Text fontSize="12px" fontWeight="600" color={design.colors.ink}>{a}</Text><Text mt={2} fontSize="10px" lineHeight="1.5" color={design.colors.quiet}>{b}</Text></Box>)}
            </Grid>
          </Box>

          <Box p={{ base: 7, md: 10, lg: 12 }} bg={design.colors.white} borderTop="3px solid" borderColor={design.colors.champagne}>
            <ContactForm />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
