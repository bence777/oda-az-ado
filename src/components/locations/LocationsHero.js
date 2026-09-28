import { useEffect, useState } from "react";
import { Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";

const debrecenImage = "https://images.unsplash.com/photo-1705697356051-57e3943d932a?auto=format&fit=crop&fm=jpg&q=82&w=2200";
const budapestImage = "https://images.unsplash.com/photo-1756413664903-159797c47477?auto=format&fit=crop&fm=jpg&q=82&w=2200";

export default function LocationsHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <Box pt={{ base: 14, md: 18, lg: 22 }} pb={{ base: 18, md: 24, lg: 28 }}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: "1.04fr .96fr" }} gap={{ base: 12, lg: 16, xl: 22 }} alignItems="stretch">
          <Flex direction="column" justify="space-between" minH={{ lg: "590px" }} opacity={mounted ? 1 : 0} transform={mounted ? "translateY(0)" : "translateY(34px)"} transition="opacity .9s ease .12s, transform 1s cubic-bezier(.16,1,.3,1) .12s">
            <Box>
              <Flex align="center" gap={4} mb={7}><Box w="34px" h="2px" bg={design.colors.champagne} /><Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.muted}>Helyszínek</Text></Flex>
              <Heading as="h1" maxW="900px" fontSize={{ base: "50px", sm: "62px", md: "78px", lg: "82px", xl: "94px" }} fontWeight="500" lineHeight=".93" letterSpacing="-.068em" color={design.colors.ink}>
                Debrecenben személyesen. <Box as="span" color={design.colors.champagne}>Országosan online.</Box>
              </Heading>
              <Text mt={8} maxW="650px" fontSize={{ base: "16px", md: "18px" }} lineHeight="1.72" color={design.colors.graphite}>
                A debreceni iroda a személyes együttműködés központja. Budapesti és más városokban működő vállalkozásokkal digitális dokumentumkezelésre és online kapcsolattartásra épülő folyamatban dolgozunk.
              </Text>
            </Box>
            <Grid mt={{ base: 10, lg: 14 }} templateColumns="repeat(3,1fr)" borderTop="1px solid" borderBottom="1px solid" borderColor={design.colors.border}>
              {[['Debrecen','személyesen + online'],['Budapest','online együttműködés'],['Országosan','digitális működés']].map(([a,b],i)=><Box key={a} py={5} px={i?5:0} borderLeft={i?'1px solid':'0'} borderColor={design.colors.border}><Text fontSize="12px" fontWeight="600" color={design.colors.ink}>{a}</Text><Text mt={1} fontSize="9px" color={design.colors.quiet}>{b}</Text></Box>)}
            </Grid>
          </Flex>

          <Box position="relative" minH={{ base: "520px", md: "590px" }} opacity={mounted ? 1 : 0} transform={mounted ? "translateY(0)" : "translateY(30px)"} transition="opacity 1s ease .24s, transform 1.1s cubic-bezier(.16,1,.3,1) .24s">
            <Box position="absolute" top="0" left="0" right={{ base: "18%", md: "22%" }} bottom={{ base: "22%", md: "18%" }} overflow="hidden" bg={design.colors.offWhite}>
              <Image src={debrecenImage} alt="Debrecen belvárosa és a Református Nagytemplom" w="100%" h="100%" objectFit="cover" objectPosition="center" />
              <Box position="absolute" inset="0" bg="linear-gradient(180deg,rgba(16,38,51,0) 45%,rgba(16,38,51,.48) 100%)" />
              <Box position="absolute" left={6} bottom={6} color="#fff"><Text fontSize="9px" letterSpacing=".12em" textTransform="uppercase" color={design.colors.champagne}>Személyes iroda</Text><Text mt={2} fontSize="24px" letterSpacing="-.04em">Debrecen</Text></Box>
            </Box>
            <Box position="absolute" right="0" bottom="0" w={{ base: "54%", md: "48%" }} h={{ base: "42%", md: "46%" }} overflow="hidden" border="8px solid" borderColor={design.colors.white} bg={design.colors.ink}>
              <Image src={budapestImage} alt="Budapest látképe a Parlamenttel és a Lánchíddal" w="100%" h="100%" objectFit="cover" objectPosition="center" />
              <Box position="absolute" inset="0" bg="linear-gradient(180deg,rgba(16,38,51,.05),rgba(16,38,51,.62))" />
              <Box position="absolute" left={5} bottom={5} color="#fff"><Text fontSize="9px" letterSpacing=".12em" textTransform="uppercase" color={design.colors.champagne}>Online</Text><Text mt={2} fontSize="20px" letterSpacing="-.04em">Budapest</Text></Box>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
