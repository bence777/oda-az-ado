import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";

const reportBlocks = [
  ["Főkönyvi kivonat", "Az aktuális könyvelési időszak egyik alapnézete."],
  ["Adófolyószámla", "A nyilvántartott kötelezettségek és eltérések áttekintésének alapja."],
  ["Előzetes adókalkuláció", "ÁFA, társasági adó és iparűzési adó várható alakulása a rendelkezésre álló adatokból."],
  ["Várható eredmény", "Rövid vezetői kép arról, hol tart a vállalkozás az aktuális időszakban."],
];

export default function OperationsReportingSection() {
  return (
    <Box py={{ base: 22, md: 30, lg: 38 }} bg={design.colors.offWhite}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: ".9fr 1.1fr" }} gap={{ base: 12, lg: 20, xl: 24 }} alignItems="center">
          <Box>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>
              A feldolgozás után
            </Text>
            <Heading as="h2" mt={6} maxW="690px" fontSize={{ base: "40px", md: "56px", lg: "66px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.058em" color={design.colors.ink}>
              A könyvelési adatból vezetői kép is készülhet.
            </Heading>
            <Text mt={8} maxW="560px" fontSize="15px" lineHeight="1.8" color={design.colors.muted}>
              Igény és megállapodás alapján havi vagy negyedéves tájékoztatás készülhet. A cél nem újabb grafikonok gyártása, hanem egy rövid, visszaolvasható összefoglaló arról, mi változott és mire érdemes figyelni.
            </Text>
            <Box mt={10} display="inline-flex" alignItems="center" gap={4} px={5} py={4} border="1px solid" borderColor={design.colors.border} bg={design.colors.white}>
              <Box w="8px" h="8px" borderRadius="50%" bg={design.colors.champagne} />
              <Text fontSize="11px" color={design.colors.graphite}>Havi vagy negyedéves ritmus · igény szerint</Text>
            </Box>
          </Box>

          <Box position="relative" px={{ base: 0, md: 5 }}>
            <Box position="absolute" display={{ base: "none", md: "block" }} top="28px" left="0" right="0" bottom="-18px" border="1px solid" borderColor={design.colors.border} bg="rgba(255,255,255,.35)" transform="rotate(-2deg)" />
            <Box position="relative" bg={design.colors.white} border="1px solid" borderColor={design.colors.border} boxShadow="0 24px 60px rgba(16,38,51,.08)" p={{ base: 7, md: 9, lg: 10 }}>
              <Grid templateColumns="1fr auto" gap={6} alignItems="start" pb={7} borderBottom="1px solid" borderColor={design.colors.border}>
                <Box>
                  <Text fontSize="9px" letterSpacing=".13em" textTransform="uppercase" color={design.colors.champagne}>Vezetői összefoglaló · minta</Text>
                  <Heading as="h3" mt={4} fontSize={{ base: "28px", md: "36px" }} fontWeight="500" letterSpacing="-.05em" color={design.colors.ink}>Aktuális időszak</Heading>
                </Box>
                <Box px={4} py={2} border="1px solid" borderColor={design.colors.border}>
                  <Text fontSize="9px" color={design.colors.quiet}>Áttekintés</Text>
                </Box>
              </Grid>

              <Grid mt={8} templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="1px" bg={design.colors.border} border="1px solid" borderColor={design.colors.border}>
                {reportBlocks.map(([title, text], index) => (
                  <Box key={title} p={{ base: 5, md: 6 }} bg={design.colors.white} minH={{ md: "175px" }}>
                    <Text fontSize="9px" fontWeight="650" color={design.colors.champagne}>0{index + 1}</Text>
                    <Text mt={5} fontSize={{ base: "16px", md: "18px" }} fontWeight="600" letterSpacing="-.025em" color={design.colors.ink}>{title}</Text>
                    <Text mt={3} fontSize="11px" lineHeight="1.65" color={design.colors.muted}>{text}</Text>
                  </Box>
                ))}
              </Grid>

              <Box mt={8} pt={6} borderTop="1px solid" borderColor={design.colors.border}>
                <Text fontSize="10px" letterSpacing=".08em" textTransform="uppercase" color={design.colors.quiet}>Vezetői kérdés</Text>
                <Text mt={3} fontSize={{ base: "20px", md: "24px" }} lineHeight="1.35" letterSpacing="-.035em" color={design.colors.ink}>
                  Mi változott az előző időszakhoz képest, és mi igényel döntést?
                </Text>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
