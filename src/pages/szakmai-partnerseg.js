import Head from "next/head";
import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import PageShell from "@/components/layout/PageShell";
import design from "@/design/system";
import { makeBreadcrumbSchema, organizationSchema, siteUrl } from "@/data/seo";

const situations = [
  "Cégalapítás",
  "Cégátalakulás",
  "Tulajdonos- vagy ügyvezetőváltás",
  "Könyvelőváltás",
  "Adózási kérdések",
  "Összetettebb gazdasági vagy jogi ügyek",
];

export default function ProfessionalPartnershipPage() {
  const canonical = `${siteUrl}/szakmai-partnerseg`;
  const title = "Szakmai partnerség ügyvédi irodáknak | Oda-Az-Adó";
  const description = "Szakmai együttműködés ügyvédi irodákkal és más szolgáltatókkal könyvelési és adószakmai háttér biztosítására, jutalékos közvetítés helyett partnerségi alapon.";
  const breadcrumbs = makeBreadcrumbSchema([
    { name: "Kezdőlap", path: "/" },
    { name: "Szakmai partnerség", path: "/szakmai-partnerseg" },
  ]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="hu_HU" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      </Head>

      <PageShell>
        <Box py={{ base: 18, md: 26, lg: 34 }}>
          <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
            <Grid templateColumns={{ base: "1fr", lg: "1.15fr .85fr" }} gap={{ base: 10, lg: 20 }} alignItems="end">
              <Box>
                <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Szakmai partnerség</Text>
                <Heading as="h1" mt={6} maxW="920px" fontSize={{ base: "50px", md: "76px", lg: "88px" }} fontWeight="500" lineHeight=".94" letterSpacing="-.065em" color={design.colors.ink}>
                  Szakmai partnereket keresünk.
                </Heading>
              </Box>
              <Text maxW="520px" fontSize={{ base: "16px", md: "18px" }} lineHeight="1.75" color={design.colors.graphite}>
                Ügyvédi irodákkal és más szakmai szolgáltatókkal hosszú távú együttműködésben gondolkodunk. Ha ügyfelei számára megbízható könyvelési és adószakmai hátteret keres, beszéljünk.
              </Text>
            </Grid>

            <Grid mt={{ base: 14, md: 20 }} templateColumns={{ base: "1fr", lg: ".8fr 1.2fr" }} gap={{ base: 10, lg: 18 }}>
              <Box p={{ base: 7, md: 9 }} bg={design.colors.ink} color="#fff">
                <Text fontSize="10px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Fontos pozicionálás</Text>
                <Heading as="h2" mt={5} fontSize={{ base: "30px", md: "40px" }} fontWeight="500" lineHeight="1.08" letterSpacing="-.045em" color="#fff">
                  Nem jutalékos közvetítésben, hanem szakmai partnerségben gondolkodunk.
                </Heading>
                <Text mt={6} fontSize="13px" lineHeight="1.75" color="rgba(255,255,255,.58)">
                  A cél az, hogy az ügyfél könyvelési és adózási kérdései rendezett szakmai háttérhez kerüljenek, miközben a saját szakmai kapcsolat és felelősségi kör egyértelmű marad.
                </Text>
              </Box>

              <Box>
                <Text fontSize="10px" fontWeight="600" letterSpacing=".14em" textTransform="uppercase" color={design.colors.muted}>Releváns helyzetek</Text>
                <Box mt={5} borderTop="1px solid" borderColor={design.colors.border}>
                  {situations.map((item, index) => (
                    <Grid key={item} py={5} borderBottom="1px solid" borderColor={design.colors.border} templateColumns="52px 1fr" gap={5}>
                      <Text fontSize="10px" color={design.colors.champagne}>0{index + 1}</Text>
                      <Text fontSize={{ base: "17px", md: "19px" }} fontWeight="600" color={design.colors.ink}>{item}</Text>
                    </Grid>
                  ))}
                </Box>
              </Box>
            </Grid>

            <Box mt={{ base: 14, md: 20 }} pt={{ base: 10, md: 12 }} borderTop="1px solid" borderColor={design.colors.border}>
              <Heading as="h2" maxW="760px" fontSize={{ base: "36px", md: "52px" }} fontWeight="500" lineHeight="1.03" letterSpacing="-.055em" color={design.colors.ink}>
                Beszéljünk a szakmai együttműködésről.
              </Heading>
              <Button as="a" href="/kapcsolat#ajanlatkeres" mt={8} h="52px" px={8} borderRadius="0" bg={design.colors.ink} color="#fff" fontSize="11px" fontWeight="650" _hover={{ bg: design.colors.champagne, color: design.colors.ink }}>
                Szakmai együttműködésről egyeztetek
              </Button>
            </Box>
          </Box>
        </Box>
      </PageShell>
    </>
  );
}
