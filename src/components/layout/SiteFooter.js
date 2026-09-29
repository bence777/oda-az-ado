import { Box, Container, Flex, Grid, Text } from "@chakra-ui/react";
import design from "../../design/system";
import { offices } from "../../data/contact";

const pageLinks = [
  ["Szolgáltatások", "/szolgaltatasok"],
  ["Működésünk", "/mukodesunk"],
  ["Rólunk", "/rolunk"],
  ["Helyszínek", "/helyszinek"],
  ["Könyvelőváltás", "/konyvelovaltas"],
  ["Szakmai partnerség", "/szakmai-partnerseg"],
  ["Kapcsolat", "/kapcsolat"],
];

const serviceLinks = [
  ["Könyvelés", "/konyveles"],
  ["Könyvelés Budapest", "/konyveles-budapest"],
  ["Adótanácsadás", "/adotanacsadas"],
  ["Bérszámfejtés", "/berszamfejtes"],
  ["Vezetői információ", "/vezetoi-informacio"],
];

function FooterLink({ href, children }) {
  return (
    <Text
      as="a"
      href={href}
      display="block"
      mb={3}
      fontSize="12px"
      color="rgba(255,255,255,.64)"
      transition={design.transition}
      _hover={{ color: design.colors.champagne }}
    >
      {children}
    </Text>
  );
}

export default function SiteFooter() {
  return (
    <Box as="footer" bg={design.colors.ink} color="#FFFFFF">
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          py={{ base: 12, md: 16 }}
          borderTop="1px solid rgba(255,255,255,.1)"
          templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1.15fr .7fr .85fr 1fr" }}
          gap={{ base: 12, md: 10, lg: 12 }}
        >
          <Box gridColumn={{ base: "auto", sm: "1 / -1", lg: "auto" }}>
            <Box w="34px" h="2px" mb={6} bg={design.colors.champagne} />
            <Text fontSize="20px" fontWeight="650" letterSpacing="-0.05em" color="#FFFFFF">
              ODA-AZ-ADÓ
            </Text>
            <Text mt={5} maxW="340px" fontSize="12px" lineHeight="1.7" color="rgba(255,255,255,.42)">
              Könyvelés, adótanácsadás, bérszámfejtés és vezetői információ
              vállalkozásoknak Debrecenben, Budapesten és online országosan.
            </Text>
          </Box>

          <Box>
            <Text mb={5} fontSize="10px" color="rgba(255,255,255,.3)">
              Oldalak
            </Text>
            {pageLinks.map(([label, href]) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </Box>

          <Box>
            <Text mb={5} fontSize="10px" color="rgba(255,255,255,.3)">
              Szolgáltatások
            </Text>
            {serviceLinks.map(([label, href]) => (
              <FooterLink key={label} href={href}>{label}</FooterLink>
            ))}
          </Box>

          <Box>
            <Text mb={5} fontSize="10px" color="rgba(255,255,255,.3)">
              Debreceni iroda
            </Text>
            <Text fontSize="12px" lineHeight="1.8" color="rgba(255,255,255,.58)">
              {offices.debrecen.address}<br />
              {offices.debrecen.access}
            </Text>
            <Text as="a" href={`tel:${offices.debrecen.phoneHref}`} display="block" mt={4} fontSize="12px" color="rgba(255,255,255,.64)">
              {offices.debrecen.phone}
            </Text>
            <Text as="a" href={`mailto:${offices.debrecen.email}`} display="block" mt={1} fontSize="12px" color="rgba(255,255,255,.64)">
              {offices.debrecen.email}
            </Text>
          </Box>
        </Grid>

        <Flex
          py={6}
          borderTop="1px solid rgba(255,255,255,.08)"
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          gap={4}
        >
          <Text fontSize="9px" color="rgba(255,255,255,.26)">
            © 2026 ODA-AZ-ADÓ Könyvviteli Kft.
          </Text>

          <Flex gap={6}>
            <Text as="a" href="/kapcsolat" fontSize="9px" color="rgba(255,255,255,.34)" _hover={{ color: design.colors.champagne }}>
              Kapcsolat
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
