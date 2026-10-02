import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";

const steps = [
  ["01", "Beérkezés", "Dokumentumok", "A szükséges bizonylatok és információk rendezett módon érkeznek be. Már a folyamat elején látszik, mely időszakhoz és feladathoz tartoznak."],
  ["02", "Ellenőrzés", "Feldolgozás", "A beérkezett anyagokat feldolgozzuk, ellenőrizzük, és ahol indokolt, a rendelkezésre álló NAV-adatokkal is egyeztetjük."],
  ["03", "Könyvelés", "Státusz", "A gazdasági események bekerülnek a könyvelésbe, közben követhető marad, hol tart az adott időszak és mi vár még egyeztetésre."],
  ["04", "Tájékoztatás", "Visszajelzés", "A fizetendő kötelezettségekről és a lényeges könyvelési információkról érthető visszajelzés készülhet."],
  ["05", "Archiválás", "Visszakeresés", "A feldolgozott háttér rendezett marad, így egy korábbi dokumentum, kimutatás vagy egyeztetés később is könnyebben megtalálható."],
  ["06", "Vezetői", "Információ", "A könyvelési adatokból érthető, vezetői szinten használható információ készülhet, amely támogatja a vállalkozás pénzügyi helyzetének átlátását és a következő döntéseket."],
];

export default function OperationsFlowSection() {
  return (
    <Box id="folyamat" py={{ base: 22, md: 30, lg: 38 }} bg={design.colors.offWhite}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: ".72fr 1.28fr" }} gap={{ base: 10, lg: 18 }} alignItems="end">
          <Box>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>A dokumentum útja</Text>
            <Heading as="h2" mt={6} maxW="610px" fontSize={{ base: "40px", md: "56px", lg: "68px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.06em" color={design.colors.ink}>Hat állomás. Egyetlen folyamat.</Heading>
          </Box>
          <Text maxW="640px" justifySelf={{ lg: "end" }} fontSize="15px" lineHeight="1.8" color={design.colors.muted}>Nem külön felületeket akarunk megmutatni, hanem azt, hogyan halad tovább ugyanaz az információ a beérkezéstől addig, amíg visszakereshető és használható lesz.</Text>
        </Grid>

        <Box mt={{ base: 14, md: 18 }}>
          <Box display={{ base: "none", lg: "block" }} position="relative" pt={2}>
            <Box position="absolute" left="5%" right="5%" top="22px" h="1px" bg={design.colors.border} />
            <Grid templateColumns="repeat(6,1fr)" gap={7} position="relative">
              {steps.map(([n, label, title, text]) => (
                <Box key={n}>
                  <Box w="42px" h="42px" borderRadius="50%" bg={design.colors.offWhite} border="1px solid" borderColor={design.colors.champagne} display="grid" placeItems="center" position="relative" zIndex="1">
                    <Text fontSize="10px" fontWeight="650" color={design.colors.champagne}>{n}</Text>
                  </Box>
                  <Text mt={7} fontSize="9px" letterSpacing=".13em" textTransform="uppercase" color={design.colors.quiet}>{label}</Text>
                  <Heading as="h3" mt={3} fontSize={{ lg: "24px", xl: "27px" }} fontWeight="600" lineHeight="1.1" letterSpacing="-.04em" color={design.colors.ink}>{title}</Heading>
                  <Text mt={5} maxW="245px" fontSize="11px" lineHeight="1.72" color={design.colors.muted}>{text}</Text>
                </Box>
              ))}
            </Grid>
          </Box>

          <Box display={{ base: "block", lg: "none" }} position="relative" pl={{ base: 10, md: 12 }}>
            <Box position="absolute" left={{ base: "15px", md: "19px" }} top="18px" bottom="18px" w="1px" bg={design.colors.border} />
            {steps.map(([n, label, title, text], index) => (
              <Box key={n} position="relative" pb={index === steps.length - 1 ? 0 : 10}>
                <Box position="absolute" left={{ base: "-40px", md: "-48px" }} top="0" w="32px" h="32px" borderRadius="50%" bg={design.colors.offWhite} border="1px solid" borderColor={design.colors.champagne} display="grid" placeItems="center">
                  <Text fontSize="9px" color={design.colors.champagne}>{n}</Text>
                </Box>
                <Text fontSize="9px" letterSpacing=".13em" textTransform="uppercase" color={design.colors.quiet}>{label}</Text>
                <Heading as="h3" mt={2} fontSize={{ base: "22px", md: "25px" }} fontWeight="600" lineHeight="1.12" letterSpacing="-.04em" color={design.colors.ink}>{title}</Heading>
                <Text mt={4} maxW="620px" fontSize="11px" lineHeight="1.72" color={design.colors.muted}>{text}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
