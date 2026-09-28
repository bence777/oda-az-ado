import { useEffect, useState } from "react";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";

export default function OperationsHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Box pt={{ base: 14, md: 18, lg: 22 }} pb={{ base: 18, md: 24, lg: 30 }}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: "1.08fr .92fr" }} gap={{ base: 12, lg: 18, xl: 24 }} alignItems="stretch">
          <Flex direction="column" justify="space-between" minH={{ lg: "580px" }} opacity={mounted ? 1 : 0} transform={mounted ? "translateY(0)" : "translateY(34px)"} transition="opacity .9s ease .12s, transform 1s cubic-bezier(.16,1,.3,1) .12s">
            <Box>
              <Flex align="center" gap={4} mb={7}><Box w="34px" h="2px" bg={design.colors.champagne} /><Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.muted}>Működésünk</Text></Flex>
              <Heading as="h1" maxW="950px" fontSize={{ base: "50px", sm: "62px", md: "78px", lg: "84px", xl: "96px" }} fontWeight="500" lineHeight=".93" letterSpacing="-.068em" color={design.colors.ink}>A könyvelés mögött <Box as="span" color={design.colors.champagne}>rendszer van.</Box></Heading>
              <Text mt={8} maxW="680px" fontSize={{ base: "16px", md: "18px" }} lineHeight="1.72" color={design.colors.graphite}>A digitalizáció nálunk nem külön termék. Arra szolgál, hogy az anyag útja, a kérdések, a kötelezettségek és a visszajelzés rendezett módon kapcsolódjanak egymáshoz.</Text>
            </Box>
            <Text mt={{ base: 10, lg: 14 }} maxW="640px" pt={6} borderTop="1px solid" borderColor={design.colors.border} fontSize={{ base: "21px", md: "26px" }} lineHeight="1.35" letterSpacing="-.035em" color={design.colors.ink}>A jó folyamatot nem attól érzi az ügyfél, hogy sok felületet lát — hanem attól, hogy kevesebb dolgot kell fejben tartania.</Text>
          </Flex>

          <Box position="relative" minH={{ base: "500px", md: "580px" }} overflow="hidden" bg={design.colors.ink} clipPath={mounted ? "inset(0 0 0 0)" : "inset(0 0 100% 0)"} transition="clip-path 1.2s cubic-bezier(.16,1,.3,1) .26s">
            <Box position="absolute" inset="0" backgroundImage="linear-gradient(180deg,rgba(16,38,51,.04),rgba(16,38,51,.86)), url('https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&fm=jpg&q=82&w=1800')" backgroundSize="cover" backgroundPosition="center" />
            <Box position="absolute" left={{ base: 6, md: 8 }} right={{ base: 6, md: 8 }} bottom={{ base: 7, md: 8 }} color="#fff">
              <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Rendezett működés</Text>
              <Text mt={4} maxW="520px" fontSize={{ base: "31px", md: "43px" }} lineHeight="1.02" letterSpacing="-.052em">Kevesebb keresés. Kevesebb utánajárás. Több használható visszajelzés.</Text>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
