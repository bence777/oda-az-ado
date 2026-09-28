import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";

const pairs = [
  ["Anyagátadás", "Kevesebb adminisztráció", "A dokumentumkezelés és a kapcsolattartás kialakítása azt szolgálja, hogy az anyagok átadása ne vigyen el indokolatlanul sok vezetői időt."],
  ["Hiányzó tételek", "Korábban látható kérdések", "A rendezett beérkezés és feldolgozás hamarabb láthatóvá teszi a hiányzó dokumentumot vagy nyitott kérdést."],
  ["Nyers könyvelési adat", "Érthető visszajelzés", "A vállalkozás nem csak adatot kap: a fizetendő kötelezettségek és a lényegi változások is összefoglalhatók."],
  ["Szétszórt előzmények", "Visszakereshető háttér", "A dokumentumok és kimutatások rendezett kezelése megkönnyíti egy későbbi ellenőrzés vagy vezetői kérdés tisztázását."],
];

export default function OperationsControlSection() {
  return (
    <Box py={{ base: 22, md: 30, lg: 38 }} bg={design.colors.white}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: ".88fr 1.12fr" }} gap={{ base: 12, lg: 18 }} alignItems="start">
          <Box position={{ lg: "sticky" }} top={{ lg: "130px" }}>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Mit ad a rendszer?</Text>
            <Heading as="h2" mt={6} maxW="690px" fontSize={{ base: "40px", md: "56px", lg: "68px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.06em" color={design.colors.ink}>Nem a technológia a lényeg. Hanem amit levesz a válláról.</Heading>
            <Text mt={7} maxW="560px" fontSize="14px" lineHeight="1.8" color={design.colors.muted}>A digitális működés önmagában nem érték. Akkor válik azzá, ha kevesebb utánajárást, kevesebb bizonytalanságot és tisztább kommunikációt eredményez.</Text>
          </Box>

          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 5, md: 6 }}>
            {pairs.map(([before, after, text], index) => (
              <Box key={after} p={{ base: 6, md: 7 }} bg={index === 0 ? design.colors.ink : index === 3 ? design.colors.offWhite : design.colors.white} border={index === 0 ? "0" : "1px solid"} borderColor={design.colors.border} minH={{ md: "280px" }} display="flex" flexDirection="column" justifyContent="space-between">
                <Box>
                  <Text fontSize="10px" color={index === 0 ? "rgba(255,255,255,.38)" : design.colors.quiet}>{before}</Text>
                  <Text mt={3} fontSize="18px" color={design.colors.champagne}>↓</Text>
                  <Heading as="h3" mt={2} fontSize={{ base: "24px", md: "29px" }} fontWeight="600" lineHeight="1.08" letterSpacing="-.045em" color={index === 0 ? "#fff" : design.colors.ink}>{after}</Heading>
                </Box>
                <Text mt={8} fontSize="11px" lineHeight="1.72" color={index === 0 ? "rgba(255,255,255,.52)" : design.colors.muted}>{text}</Text>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
