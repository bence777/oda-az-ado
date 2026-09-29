import { useEffect, useState } from "react";
import { Box, Button, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";
import { offices } from "../../data/contact";

const debrecenImage = "https://images.unsplash.com/photo-1705697356051-57e3943d932a?auto=format&fit=crop&fm=jpg&q=82&w=2200";

export default function ContactHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <Box pt={{ base: 14, md: 18, lg: 22 }} pb={{ base: 18, md: 24, lg: 28 }}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: "1.05fr .95fr" }} gap={{ base: 12, lg: 16, xl: 22 }} alignItems="stretch">
          <Flex direction="column" justify="space-between" minH={{ lg: "560px" }} opacity={mounted ? 1 : 0} transform={mounted ? "translateY(0)" : "translateY(34px)"} transition="opacity .9s ease .12s, transform 1s cubic-bezier(.16,1,.3,1) .12s">
            <Box>
              <Flex align="center" gap={4} mb={7}><Box w="34px" h="2px" bg={design.colors.champagne} /><Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.muted}>Kapcsolat</Text></Flex>
              <Heading as="h1" maxW="900px" fontSize={{ base: "50px", sm: "62px", md: "78px", lg: "82px", xl: "94px" }} fontWeight="500" lineHeight=".93" letterSpacing="-.068em" color={design.colors.ink}>
                Ajánlatkérés, <Box as="span" color={design.colors.champagne}>felesleges körök nélkül.</Box>
              </Heading>
              <Text mt={8} maxW="640px" fontSize={{ base: "16px", md: "18px" }} lineHeight="1.72" color={design.colors.graphite}>
                Néhány alapadat segít abban, hogy már az első egyeztetés előtt lássuk a vállalkozás méretét és az együttműködés jellegét. Könyvelési dokumentumokat ezen a ponton nem kérünk.
              </Text>
            </Box>
            <Flex mt={{ base: 9, lg: 12 }} gap={5} align="center" wrap="wrap">
              <Button as="a" href="#ajanlatkeres" h="52px" px={8} borderRadius="0" bg={design.colors.ink} color="#fff" fontSize="11px" fontWeight="650" _hover={{ bg: design.colors.champagne, color: design.colors.ink }}>Ajánlatot kérek</Button>
              <Text as="a" href={`tel:${offices.debrecen.mobileHref}`} pb="4px" borderBottom="1px solid" borderColor={design.colors.champagne} fontSize="11px" fontWeight="600" color={design.colors.ink}>{offices.debrecen.mobile}</Text>
            </Flex>
          </Flex>

          <Box position="relative" minH={{ base: "500px", md: "560px" }} overflow="hidden" bg={design.colors.ink} clipPath={mounted ? "inset(0 0 0 0)" : "inset(0 0 100% 0)"} transition="clip-path 1.2s cubic-bezier(.16,1,.3,1) .26s">
            <Image src={debrecenImage} alt="Debrecen belvárosa" position="absolute" inset="0" w="100%" h="100%" objectFit="cover" />
            <Box position="absolute" inset="0" bg="linear-gradient(180deg,rgba(16,38,51,.12) 25%,rgba(16,38,51,.9) 100%)" />
            <Box position="absolute" left={{ base: 6, md: 8 }} right={{ base: 6, md: 8 }} bottom={{ base: 7, md: 8 }} color="#fff">
              <Text fontSize="9px" letterSpacing=".12em" textTransform="uppercase" color={design.colors.champagne}>Debreceni iroda</Text>
              <Text mt={3} fontSize={{ base: "27px", md: "34px" }} fontWeight="500" lineHeight="1.08" letterSpacing="-.045em">{offices.debrecen.address}</Text>
              <Grid mt={6} pt={5} borderTop="1px solid rgba(255,255,255,.24)" templateColumns="1fr 1fr" gap={4}>
                <Box><Text fontSize="9px" color="rgba(255,255,255,.45)">Telefon</Text><Text mt={2} fontSize="12px">{offices.debrecen.phone}</Text></Box>
                <Box><Text fontSize="9px" color="rgba(255,255,255,.45)">E-mail</Text><Text mt={2} fontSize="12px">{offices.debrecen.email}</Text></Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
