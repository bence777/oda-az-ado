import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";
import { offices } from "../../data/contact";

export default function PrimaryLocationsSection() {
  const office = offices.debrecen;
  return (
    <Box py={{ base: 22, md: 30, lg: 38 }} bg={design.colors.offWhite}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: "1.05fr .95fr" }} gap={{ base: 10, lg: 18 }} alignItems="stretch">
          <Box minH={{ base: "460px", md: "580px" }} position="relative" overflow="hidden" bg={design.colors.ink}>
            <Box position="absolute" inset="0" backgroundImage="linear-gradient(180deg,rgba(16,38,51,.06),rgba(16,38,51,.88)), url('https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?auto=format&fit=crop&fm=jpg&q=82&w=1800')" backgroundSize="cover" backgroundPosition="center" />
            <Box position="absolute" left={{ base: 6, md: 8 }} right={{ base: 6, md: 8 }} bottom={{ base: 7, md: 8 }} color="#fff">
              <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Debrecen · személyesen</Text>
              <Heading as="h2" mt={4} fontSize={{ base: "38px", md: "52px" }} fontWeight="500" lineHeight="1" letterSpacing="-.055em" color="#fff">Helyi jelenlét, digitális háttér.</Heading>
              <Text mt={5} maxW="560px" fontSize="13px" lineHeight="1.75" color="rgba(255,255,255,.7)">A személyes egyeztetés lehetősége megmarad, miközben a dokumentumkezelés és a napi kapcsolattartás nem függ az irathordástól.</Text>
              <Grid mt={7} templateColumns={{ base: "1fr", sm: "1fr auto" }} gap={5} alignItems="end" pt={5} borderTop="1px solid rgba(255,255,255,.24)">
                <Box><Text fontSize="12px" fontWeight="600">{office.address}</Text><Text mt={2} fontSize="10px" color="rgba(255,255,255,.48)">{office.phone} · {office.email}</Text></Box>
                <Button as="a" href={office.mapUrl} target="_blank" rel="noreferrer" h="42px" px={5} borderRadius="0" bg="transparent" border="1px solid rgba(255,255,255,.35)" color="#fff" fontSize="10px" _hover={{ bg: "#fff", color: design.colors.ink }}>Térkép</Button>
              </Grid>
            </Box>
          </Box>

          <Box py={{ base: 2, lg: 8 }} px={{ lg: 6 }} display="flex" flexDirection="column" justifyContent="center">
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Budapest · online</Text>
            <Heading as="h2" mt={6} maxW="650px" fontSize={{ base: "40px", md: "56px", lg: "64px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.06em" color={design.colors.ink}>Nem kell ugyanabban a városban lennünk ahhoz, hogy a folyamat rendezett legyen.</Heading>
            <Text mt={7} maxW="560px" fontSize="14px" lineHeight="1.8" color={design.colors.muted}>Budapesti ügyfelekkel a dokumentumátadás és a szakmai egyeztetés online működésre épül. A hangsúly nem a helyszínen, hanem a követhető feldolgozáson és az elérhető szakmai háttéren van.</Text>
            <Text as="a" href="/konyveles-budapest" display="inline-block" alignSelf="flex-start" mt={8} pb="4px" borderBottom="1px solid" borderColor={design.colors.champagne} fontSize="11px" fontWeight="600" color={design.colors.ink}>Könyvelés Budapesten</Text>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
