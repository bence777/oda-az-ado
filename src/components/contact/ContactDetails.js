import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";
import { company, offices } from "../../data/contact";

export default function ContactDetails() {
  const office = offices.debrecen;
  return (
    <Box py={{ base: 20, md: 28, lg: 34 }} bg={design.colors.white}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: ".85fr 1.15fr" }} gap={{ base: 10, lg: 20 }} alignItems="start">
          <Box>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Elérhetőség</Text>
            <Heading as="h2" mt={6} maxW="620px" fontSize={{ base: "38px", md: "52px", lg: "62px" }} fontWeight="500" lineHeight="1" letterSpacing="-.058em" color={design.colors.ink}>Személyesen Debrecenben. Online bárhonnan.</Heading>
            <Text mt={7} maxW="520px" fontSize="14px" lineHeight="1.8" color={design.colors.muted}>Ha nem biztos benne, melyik együttműködési forma illik a vállalkozásához, elég egy rövid üzenet. A részleteket az első egyeztetésen pontosítjuk.</Text>
          </Box>

          <Box borderTop="1px solid" borderColor={design.colors.border}>
            <Grid templateColumns={{ base: "1fr", md: "160px 1fr" }} gap={{ base: 3, md: 8 }} py={7} borderBottom="1px solid" borderColor={design.colors.border}>
              <Text fontSize="9px" letterSpacing=".12em" textTransform="uppercase" color={design.colors.champagne}>Debrecen</Text>
              <Box>
                <Text fontSize={{ base: "22px", md: "27px" }} fontWeight="600" letterSpacing="-.04em" color={design.colors.ink}>{office.address}</Text>
                <Text mt={3} fontSize="11px" color={design.colors.quiet}>{office.access}</Text>
                <Flex mt={5} gapX={7} gapY={2} wrap="wrap">
                  <Text as="a" href={`tel:${office.phoneHref}`} fontSize="12px" color={design.colors.graphite}>{office.phone}</Text>
                  <Text as="a" href={`tel:${office.mobileHref}`} fontSize="12px" color={design.colors.graphite}>{office.mobile}</Text>
                  <Text as="a" href={`mailto:${office.email}`} fontSize="12px" color={design.colors.graphite}>{office.email}</Text>
                </Flex>
                <Button as="a" href={office.mapUrl} target="_blank" rel="noreferrer" mt={6} h="42px" px={5} borderRadius="0" bg={design.colors.ink} color="#fff" fontSize="10px" _hover={{ bg: design.colors.champagne, color: design.colors.ink }}>Megnyitom térképen</Button>
              </Box>
            </Grid>

            <Grid templateColumns={{ base: "1fr", md: "160px 1fr" }} gap={{ base: 3, md: 8 }} py={7} borderBottom="1px solid" borderColor={design.colors.border}>
              <Text fontSize="9px" letterSpacing=".12em" textTransform="uppercase" color={design.colors.champagne}>Online</Text>
              <Box>
                <Text fontSize={{ base: "22px", md: "27px" }} fontWeight="600" letterSpacing="-.04em" color={design.colors.ink}>Budapest és országosan</Text>
                <Text mt={3} maxW="650px" fontSize="12px" lineHeight="1.75" color={design.colors.muted}>Digitális dokumentumkezelés és online szakmai egyeztetés ugyanazzal a könyvelési háttérrel, személyes irathordás nélkül.</Text>
                <Text as="a" href="/helyszinek" display="inline-block" mt={5} pb="4px" borderBottom="1px solid" borderColor={design.colors.champagne} fontSize="11px" fontWeight="600" color={design.colors.ink}>Helyszínek és online működés</Text>
              </Box>
            </Grid>

            <Grid templateColumns={{ base: "1fr", md: "160px 1fr" }} gap={{ base: 3, md: 8 }} py={7}>
              <Text fontSize="9px" letterSpacing=".12em" textTransform="uppercase" color={design.colors.quiet}>Cégadatok</Text>
              <Text fontSize="11px" lineHeight="1.75" color={design.colors.muted}>{company.legalName}<br/>Adószám: {company.taxId}<br/>Cégjegyzékszám: {company.companyRegistrationNumber}<br/>Székhely: {company.registeredOffice}</Text>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
