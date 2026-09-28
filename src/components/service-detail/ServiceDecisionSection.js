import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

export default function ServiceDecisionSection({ service }) {
  const trust = service.trustItems || [];
  const fit = service.fit || [];
  return (
    <Section py={{ base: 20, md: 28, lg: 34 }} bg={design.colors.white}>
      <PageContainer>
        <Grid templateColumns={{ base: "1fr", lg: ".8fr 1.2fr" }} gap={{ base: 12, lg: 18 }} alignItems="start">
          <Box position={{ lg: "sticky" }} top={{ lg: "130px" }}>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Mikor releváns?</Text>
            <Heading as="h2" mt={6} maxW="610px" fontSize={{ base: "40px", md: "54px", lg: "62px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.058em" color={design.colors.ink}>{service.fitTitle}</Heading>
            <Text mt={7} maxW="520px" fontSize="13px" lineHeight="1.8" color={design.colors.muted}>Nem minden vállalkozásnak ugyanarra van szüksége. Ezek a helyzetek jelzik leginkább, amikor ez a szolgáltatási terület valódi értéket tud adni.</Text>
          </Box>

          <Box>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 5, md: 6 }}>
              {fit.map((item,index)=><Box key={item} p={{ base: 6, md: 7 }} minH={{ md: "190px" }} bg={index % 2 === 0 ? design.colors.offWhite : design.colors.white} border="1px solid" borderColor={design.colors.border} display="flex" flexDirection="column" justifyContent="space-between"><Text fontSize="9px" color={design.colors.champagne}>{String(index+1).padStart(2,'0')}</Text><Text mt={8} fontSize={{ base: "18px", md: "21px" }} lineHeight="1.4" letterSpacing="-.03em" color={design.colors.graphite}>{item}</Text></Box>)}
            </Grid>

            {trust.length ? (
              <Grid mt={{ base: 10, md: 12 }} templateColumns={{ base: "1fr", md: `repeat(${Math.min(trust.length,4)},1fr)` }} gap={{ base: 5, md: 6 }} pt={7} borderTop="1px solid" borderColor={design.colors.border}>
                {trust.slice(0,4).map((item)=><Box key={item.title}><Text fontSize="12px" fontWeight="700" color={design.colors.ink}>{item.title}</Text><Text mt={3} fontSize="10px" lineHeight="1.65" color={design.colors.muted}>{item.text}</Text></Box>)}
              </Grid>
            ) : null}
          </Box>
        </Grid>
      </PageContainer>
    </Section>
  );
}
