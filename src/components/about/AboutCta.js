import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

export default function AboutCta() {
  return (
    <Section bg={design.colors.offWhite} py={{ base: 20, md: 26, lg: 30 }}>
      <PageContainer>
        <Box maxW="1120px" mx="auto" textAlign="center">
          <Text
            fontSize="10px"
            fontWeight="600"
            letterSpacing=".16em"
            textTransform="uppercase"
            color={design.colors.champagne}
          >
            Együttműködés
          </Text>
          <Heading
            as="h2"
            mt={6}
            fontFamily={design.fonts.sans}
            fontSize={{ base: "40px", md: "58px", lg: "70px" }}
            fontWeight="500"
            lineHeight="1"
            letterSpacing="-.06em"
            color={design.colors.ink}
          >
            A jó együttműködés azzal kezdődik, hogy megértjük, hogyan működik a vállalkozása.
          </Heading>
          <Text
            mt={7}
            mx="auto"
            maxW="620px"
            fontSize="14px"
            lineHeight="1.75"
            color={design.colors.muted}
          >
            Ha olyan könyvelőt keres, akire nyugodtan rábízhatja vállalkozása pénzügyi hátterét, beszéljünk.
          </Text>

          <Flex mt={9} justify="center" align="center" gap={{ base: 6, md: 8 }} wrap="wrap">
            <Button
              as="a"
              href="/kapcsolat"
              h="52px"
              px={8}
              borderRadius="0"
              bg={design.colors.ink}
              color={design.colors.white}
              fontSize="11px"
              fontWeight="600"
              transition="background .3s ease, color .3s ease, transform .3s ease"
              _hover={{ bg: design.colors.champagne, color: design.colors.ink, transform: "translateY(-2px)" }}
            >
              Ajánlatot kérek
            </Button>
            <Text
              as="a"
              href="/mukodesunk"
              position="relative"
              pb="4px"
              fontSize="11px"
              fontWeight="600"
              color={design.colors.ink}
              _after={{
                content: '\"\"',
                position: "absolute",
                left: 0,
                bottom: 0,
                w: "100%",
                h: "1px",
                bg: design.colors.champagne,
              }}
            >
              Megnézem, hogyan dolgozunk
            </Text>
          </Flex>
        </Box>
      </PageContainer>
    </Section>
  );
}
