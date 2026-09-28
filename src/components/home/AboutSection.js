import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";

export default function AboutSection() {
  return (
    <Box
      id="rolunk"
      bg="#F3EDE3"
      py={{ base: 22, md: 28, lg: 34 }}
    >
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: ".6fr 1.4fr" }}
          gap={{ base: 10, lg: 20 }}
          alignItems="start"
        >
          <Box>
            <Box w="34px" h="2px" bg={design.colors.champagne} mb={6} />
            <Text
              fontSize="12px"
              fontWeight="600"
              color={design.colors.graphite}
            >
              ODA-AZ-ADÓ
            </Text>
          </Box>

          <Box maxW="920px">
            <Heading
              as="h2"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "38px", sm: "46px", md: "56px", lg: "64px" }}
              fontWeight="500"
              lineHeight="1.02"
              letterSpacing="-0.055em"
              color={design.colors.ink}
            >
              Tapasztalat, amelyre
              <br />
              rendezett rendszer épül.
            </Heading>

            <Grid
              mt={{ base: 9, md: 11 }}
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={{ base: 6, md: 12 }}
            >
              <Text
                fontSize="15px"
                lineHeight="1.75"
                color={design.colors.graphite}
              >
                Több mint egy évtizede dolgozunk vállalkozások könyvelésén
                és adózásán.
              </Text>

              <Box>
                <Text
                  fontSize="14px"
                  lineHeight="1.75"
                  color={design.colors.muted}
                >
                  Debreceni jelenlétünkre építve online is együtt dolgozunk
                  az ország különböző pontjain működő vállalkozásokkal.
                </Text>

                <Text
                  as="a"
                  href="/rolunk"
                  display="inline-block"
                  position="relative"
                  mt={7}
                  pb="4px"
                  fontSize="11px"
                  fontWeight="600"
                  color={design.colors.ink}
                  _after={{
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    w: "100%",
                    h: "1px",
                    bg: design.colors.champagne,
                  }}
                >
                  Rólunk
                </Text>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   LOCATIONS
========================================================= */

