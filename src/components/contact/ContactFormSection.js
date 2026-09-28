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
              Elég, ha azt írja le, <Box as="span" color={design.colors.graphite}>mi a helyzet most.</Box>
            </Heading>
            <Text mt={7} maxW="500px" fontSize="15px" lineHeight="1.8" color={design.colors.muted}>
              Az első üzenethez elég három dolog: egy név, egy elérhetőség és néhány mondat a helyzetről. A cég működésének részleteit csak akkor pontosítjuk, amikor már látjuk, mire van valóban szükség.
            </Text>
            <Grid mt={10} templateColumns="1fr 1fr" gap={4}>
              {[['3 kötelező mező','név · e-mail · rövid üzenet'],['A részletek később','az egyeztetésen pontosítjuk']].map(([a,b])=><Box key={a} p={5} bg={design.colors.white} border="1px solid" borderColor={design.colors.border}><Text fontSize="12px" fontWeight="600" color={design.colors.ink}>{a}</Text><Text mt={2} fontSize="10px" lineHeight="1.5" color={design.colors.quiet}>{b}</Text></Box>)}
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
