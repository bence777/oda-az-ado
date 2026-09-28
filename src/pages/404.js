import Head from "next/head";
import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import PageShell from "@/components/layout/PageShell";
import design from "@/design/system";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Az oldal nem található | Oda-Az-Adó</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <PageShell>
        <Box py={{ base: 22, md: 30, lg: 38 }}>
          <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
            <Grid templateColumns={{ base: "1fr", lg: "1.18fr .82fr" }} gap={{ base: 12, lg: 20 }} alignItems="end" minH={{ lg: "580px" }}>
              <Box>
                <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>404 · Az oldal nem található</Text>
                <Heading as="h1" mt={7} maxW="900px" fontSize={{ base: "50px", md: "76px", lg: "92px" }} fontWeight="500" lineHeight=".93" letterSpacing="-.068em" color={design.colors.ink}>
                  Itt most nincs semmi, amit <Box as="span" color={design.colors.champagne}>könyvelni kellene.</Box>
                </Heading>
                <Text mt={8} maxW="620px" fontSize={{ base: "16px", md: "18px" }} lineHeight="1.72" color={design.colors.muted}>
                  A keresett oldal megszűnhetett vagy más címre költözhetett. A főoldalról és a szolgáltatások közül gyorsan megtalálhatja, amit keres.
                </Text>
                <Button as="a" href="/" mt={9} h="52px" px={8} borderRadius="0" bg={design.colors.ink} color="#fff" fontSize="11px" fontWeight="650" _hover={{ bg: design.colors.champagne, color: design.colors.ink }}>
                  Vissza a főoldalra
                </Button>
              </Box>
              <Box bg={design.colors.ink} p={{ base: 7, md: 10 }} color="#fff">
                <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Hasznos oldalak</Text>
                {[['Szolgáltatások','/szolgaltatasok'],['Könyvelés','/konyveles'],['Működésünk','/mukodesunk'],['Kapcsolat','/kapcsolat']].map(([label,href],index)=>(
                  <Box key={href} as="a" href={href} display="flex" justifyContent="space-between" alignItems="center" py={5} borderTop={index ? "1px solid rgba(255,255,255,.12)" : "0"} borderBottom={index === 3 ? "1px solid rgba(255,255,255,.12)" : "0"} color="#fff">
                    <Text fontSize={{ base: "18px", md: "22px" }} letterSpacing="-.03em">{label}</Text>
                    <Text fontSize="10px" color="rgba(255,255,255,.42)">Megnyitás</Text>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Box>
        </Box>
      </PageShell>
    </>
  );
}
