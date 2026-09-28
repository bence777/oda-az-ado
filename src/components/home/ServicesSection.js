import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";
import { services } from "../../data/home";

export default function ServicesSection() {
  return (
    <Box id="szolgaltatasok" py={{ base: 22, md: 30, lg: 38 }}>
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: ".8fr 1.2fr" }}
          gap={{ base: 12, lg: 20, xl: 28 }}
        >
          <Box position={{ lg: "sticky" }} top={{ lg: "120px" }} alignSelf="start">
            <Heading
              as="h2"
              maxW="550px"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "40px", md: "52px", lg: "60px" }}
              fontWeight="500"
              lineHeight="1"
              letterSpacing="-0.055em"
              color={design.colors.ink}
            >
              Több, mint
              <br />
              könyvelés.
            </Heading>

            <Text
              mt={7}
              maxW="390px"
              fontSize="15px"
              lineHeight="1.7"
              color={design.colors.muted}
            >
              A pontos könyvelés az alap. A valódi érték akkor kezdődik,
              amikor a számokból érthető információ és jobb döntés lesz.
            </Text>
          </Box>

          <Box borderTop="1px solid" borderColor={design.colors.border}>
            {services.map((service, index) => (
              <Box
                key={service.title}
                as="a"
                href={service.href}
                display="block"
                position="relative"
                py={{ base: 7, md: 9 }}
                borderBottom="1px solid"
                borderColor={design.colors.border}
                overflow="hidden"
                role="group"
              >
                <Box
                  position="absolute"
                  inset="0"
                  bg="#F3EDE3"
                  transform="translateY(102%)"
                  transition="transform .5s cubic-bezier(.16,1,.3,1)"
                  _groupHover={{ transform: "translateY(0)" }}
                />

                <Box
                  position="absolute"
                  left="0"
                  top="0"
                  w="3px"
                  h="100%"
                  bg={design.colors.champagne}
                  transform="scaleY(0)"
                  transformOrigin="bottom"
                  transition="transform .45s cubic-bezier(.16,1,.3,1)"
                  _groupHover={{
                    transform: "scaleY(1)",
                    transformOrigin: "top",
                  }}
                />

                <Grid
                  position="relative"
                  zIndex="1"
                  templateColumns={{
                    base: "42px 1fr",
                    md: "70px .8fr 1fr",
                  }}
                  gap={{ base: 4, md: 8 }}
                  alignItems="start"
                  px={{ base: 0, md: 2 }}
                  transition="transform .45s cubic-bezier(.16,1,.3,1)"
                  _groupHover={{
                    transform: { md: "translateX(14px)" },
                  }}
                >
                  <Text
                    pt="4px"
                    fontSize="10px"
                    fontWeight="600"
                    color={design.colors.champagne}
                  >
                    0{index + 1}
                  </Text>

                  <Heading
                    as="h3"
                    fontFamily={design.fonts.sans}
                    fontSize={{ base: "21px", md: "25px" }}
                    fontWeight="550"
                    lineHeight="1.15"
                    letterSpacing="-0.035em"
                    color={design.colors.ink}
                  >
                    {service.title}
                  </Heading>

                  <Text
                    gridColumn={{ base: "2", md: "auto" }}
                    maxW="390px"
                    fontSize={{ base: "13px", md: "14px" }}
                    lineHeight="1.65"
                    color={design.colors.muted}
                  >
                    {service.text}
                  </Text>
                </Grid>
              </Box>
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================================================
   PROCESS
========================================================= */

