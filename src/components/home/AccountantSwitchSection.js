import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";
import { switchSteps } from "../../data/home";

export default function AccountantSwitchSection() {
  return (
    <Box
      id="konyvelovaltas"
      bg={design.colors.white}
      py={{ base: 24, md: 32, lg: 40 }}
    >
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: ".92fr 1.08fr" }}
          gap={{ base: 12, lg: 24, xl: 30 }}
          alignItems="start"
        >
          <Box position={{ lg: "sticky" }} top={{ lg: "120px" }}>
            <Box w="46px" h="3px" mb={9} bg={design.colors.champagne} />

            <Heading
              as="h2"
              maxW="620px"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "44px", sm: "52px", md: "66px", lg: "72px" }}
              fontWeight="500"
              lineHeight=".97"
              letterSpacing="-0.062em"
              color={design.colors.ink}
            >
              2027-et már
              <br />
              új könyvelővel
              <br />
              kezdené?
            </Heading>

            <Text
              mt={8}
              maxW="410px"
              fontSize={{ base: "15px", md: "16px" }}
              lineHeight="1.75"
              color={design.colors.muted}
            >
              A könyvelőváltást érdemes előre megtervezni. Az
              átadás-átvétel lépéseit átláthatóan végigvesszük, hogy az
              új együttműködés rendezett alapokról induljon.
            </Text>

            <Button
              as="a"
              href="/konyvelovaltas"
              mt={9}
              h="52px"
              px={8}
              borderRadius="0"
              bg={design.colors.ink}
              color={design.colors.white}
              fontSize="11px"
              fontWeight="600"
              transition="background .3s ease, color .3s ease, transform .3s ease"
              _hover={{
                bg: design.colors.champagne,
                color: design.colors.ink,
                transform: "translateY(-2px)",
              }}
            >
              Beszéljünk a könyvelőváltásról
            </Button>
          </Box>

          <Box borderTop="1px solid" borderColor={design.colors.border}>
            {switchSteps.map(([title, copy], index) => (
              <Grid
                key={title}
                templateColumns={{
                  base: "44px 1fr",
                  md: "72px .72fr 1fr",
                }}
                gap={{ base: 4, md: 8 }}
                py={{ base: 6, md: 7 }}
                borderBottom="1px solid"
                borderColor={design.colors.border}
                alignItems="start"
              >
                <Text
                  pt="3px"
                  fontSize="10px"
                  fontWeight="600"
                  color={design.colors.champagne}
                >
                  0{index + 1}
                </Text>

                <Text
                  fontSize={{ base: "16px", md: "17px" }}
                  fontWeight="600"
                  letterSpacing="-0.025em"
                  color={design.colors.ink}
                >
                  {title}
                </Text>

                <Text
                  gridColumn={{ base: "2", md: "auto" }}
                  maxW="390px"
                  fontSize="13px"
                  lineHeight="1.65"
                  color={design.colors.muted}
                >
                  {copy}
                </Text>
              </Grid>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   ABOUT
========================================================= */

