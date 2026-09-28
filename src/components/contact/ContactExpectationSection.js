import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";

const steps = [
  ["01", "Üzenet", "Néhány mondatból megértjük, milyen helyzetben keres bennünket."],
  ["02", "Egyeztetés", "Csak azokat a részleteket kérdezzük meg, amelyek a konkrét helyzethez tényleg szükségesek."],
  ["03", "Ajánlat", "A feladatok és az együttműködés módja alapján egyedi ajánlat készül."],
];

export default function ContactExpectationSection() {
  return (
    <Box py={{ base: 22, md: 30, lg: 36 }} bg={design.colors.ink} color="#fff">
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: ".8fr 1.2fr" }} gap={{ base: 10, lg: 20 }} alignItems="end">
          <Box>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Mi történik utána?</Text>
            <Heading as="h2" mt={6} maxW="620px" fontSize={{ base: "38px", md: "52px", lg: "62px" }} fontWeight="500" lineHeight="1" letterSpacing="-.058em" color="#fff">Az első üzenet nem egy vizsga. Innen már beszélgetés következik.</Heading>
          </Box>
          <Text maxW="560px" justifySelf={{ lg: "end" }} fontSize="14px" lineHeight="1.8" color="rgba(255,255,255,.52)">Nem kérünk előre olyan adatokat, amelyekről még nem tudjuk, hogy számítanak-e. A részletes kérdések akkor jönnek, amikor már van kontextusuk.</Text>
        </Grid>

        <Grid mt={{ base: 12, md: 16 }} templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} borderTop="1px solid rgba(255,255,255,.16)">
          {steps.map(([n,title,text],index)=><Box key={n} py={{ base: 6, md: 8 }} pr={{ md: 8 }} borderBottom={{ base: "1px solid rgba(255,255,255,.12)", md: "0" }} borderLeft={{ md: index?"1px solid rgba(255,255,255,.12)":"0" }} pl={{ md: index?8:0 }}><Text fontSize="9px" color={design.colors.champagne}>{n}</Text><Text mt={4} fontSize={{ base: "22px", md: "27px" }} fontWeight="500" letterSpacing="-.04em">{title}</Text><Text mt={4} fontSize="11px" lineHeight="1.72" color="rgba(255,255,255,.48)">{text}</Text></Box>)}
        </Grid>
      </Box>
    </Box>
  );
}
