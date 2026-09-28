import { Box, Grid, Heading, Image, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

const DEBRECEN = "https://images.unsplash.com/photo-1705697356051-57e3943d932a?auto=format&fit=crop&fm=jpg&q=82&w=2200";
const BUDAPEST = "https://images.unsplash.com/photo-1756413664903-159797c47477?auto=format&fit=crop&fm=jpg&q=82&w=2200";

export default function ReachSection() {
  return (
    <Section py={{ base: 20, md: 28, lg: 34 }}>
      <PageContainer>
        <Grid templateColumns={{ base: "1fr", lg: "1.02fr .98fr" }} gap={{ base: 12, lg: 18, xl: 24 }} alignItems="stretch">
          <Box>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Helyben és online</Text>
            <Heading as="h2" mt={6} maxW="790px" fontFamily={design.fonts.sans} fontSize={{ base: "41px", md: "57px", lg: "67px" }} fontWeight="500" lineHeight="1" letterSpacing="-.058em" color={design.colors.ink}>
              Debrecenből indultunk. Ma már nem a távolság határozza meg az együttműködést.
            </Heading>
            <Text mt={7} maxW="620px" fontSize="14px" lineHeight="1.8" color={design.colors.muted}>
              A személyes jelenlét Debrecenben megmarad, miközben a digitális dokumentumkezelés és az online kapcsolattartás lehetővé teszi, hogy budapesti és országos ügyfelekkel is ugyanarra a szakmai rendre épüljön a közös munka.
            </Text>
            <Grid mt={{ base: 10, md: 12 }} templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={7}>
              <Box pt={6} borderTop="1px solid" borderColor={design.colors.border}><Text fontSize="12px" fontWeight="600" color={design.colors.ink}>Debrecen</Text><Text mt={3} fontSize="13px" lineHeight="1.72" color={design.colors.muted}>Személyes egyeztetés, helyi iroda és digitális dokumentumkezelés egymás mellett.</Text></Box>
              <Box pt={6} borderTop="1px solid" borderColor={design.colors.border}><Text fontSize="12px" fontWeight="600" color={design.colors.ink}>Budapest és országosan</Text><Text mt={3} fontSize="13px" lineHeight="1.72" color={design.colors.muted}>Online könyvelés, digitális dokumentumkezelés és folyamatos szakmai kapcsolattartás.</Text></Box>
            </Grid>
          </Box>

          <Box position="relative" minH={{ base: "480px", md: "540px" }}>
            <Box position="absolute" inset="0 18% 16% 0" overflow="hidden"><Image src={DEBRECEN} alt="Debrecen belvárosa" w="100%" h="100%" objectFit="cover" /><Box position="absolute" inset="0" bg="linear-gradient(180deg,rgba(16,38,51,0) 50%,rgba(16,38,51,.5))" /><Box position="absolute" left={6} bottom={6} color="#fff"><Text fontSize="9px" color={design.colors.champagne}>KÖZPONT</Text><Text mt={2} fontSize="26px" letterSpacing="-.04em">Debrecen</Text></Box></Box>
            <Box position="absolute" right="0" bottom="0" w="48%" h="42%" overflow="hidden" border="8px solid" borderColor={design.colors.white}><Image src={BUDAPEST} alt="Budapest látképe" w="100%" h="100%" objectFit="cover" /><Box position="absolute" inset="0" bg="linear-gradient(180deg,rgba(16,38,51,.05),rgba(16,38,51,.58))" /><Box position="absolute" left={5} bottom={5} color="#fff"><Text fontSize="9px" color={design.colors.champagne}>ONLINE</Text><Text mt={2} fontSize="21px" letterSpacing="-.04em">Budapest</Text></Box></Box>
          </Box>
        </Grid>
      </PageContainer>
    </Section>
  );
}
