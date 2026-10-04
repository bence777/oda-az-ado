import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";

export default function LocationsSection() {
  return (
    <Box bg={design.colors.white} py={{ base: 24, md: 32, lg: 40 }}>
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          pb={{ base: 14, md: 18, lg: 22 }}
          templateColumns={{ base: "1fr", lg: "1.15fr .85fr" }}
          gap={{ base: 8, lg: 20 }}
          alignItems="end"
        >
          <Heading
            as="h2"
            maxW="780px"
            fontFamily={design.fonts.sans}
            fontSize={{ base: "42px", sm: "50px", md: "62px", lg: "72px" }}
            fontWeight="500"
            lineHeight=".98"
            letterSpacing="-0.06em"
            color={design.colors.ink}
          >
            Helyben és
            <br />
            <Box as="span" color={design.colors.champagne}>
              online is.
            </Box>
          </Heading>

          <Box maxW="440px" justifySelf={{ lg: "end" }}>
            <Text
              fontSize={{ base: "15px", md: "16px" }}
              lineHeight="1.75"
              color={design.colors.muted}
            >
              Debrecenben személyes együttműködéssel vagyunk jelen. Budapesti
              és az ország más részein működő vállalkozásokkal online,
              digitális dokumentumkezeléssel dolgozunk együtt.
            </Text>
            <Text
              as="a"
              href="/helyszinek"
              display="inline-block"
              mt={6}
              pb="4px"
              borderBottom="1px solid"
              borderColor={design.colors.champagne}
              fontSize="11px"
              fontWeight="600"
              color={design.colors.ink}
            >
              Helyszínek részletesen
            </Text>
          </Box>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr", lg: "1.1fr .9fr" }}
          minH={{ lg: "690px", xl: "760px" }}
        >
          <Box
            position="relative"
            minH={{ base: "540px", md: "650px", lg: "auto" }}
            overflow="hidden"
            role="group"
          >
            <Image
              src="https://images.unsplash.com/photo-1705697356051-57e3943d932a?auto=format&fit=crop&w=1800&q=90"
              alt="Debreceni Nagytemplom"
              position="absolute"
              inset="0"
              w="100%"
              h="100%"
              objectFit="cover"
              objectPosition="center"
              filter="saturate(.72) contrast(1.02)"
              transition="transform 1.2s cubic-bezier(.16,1,.3,1), filter 1.2s ease"
              _groupHover={{
                transform: "scale(1.025)",
                filter: "saturate(.88) contrast(1.02)",
              }}
            />

            <Box
              position="absolute"
              inset="0"
              bg="linear-gradient(180deg, rgba(10,18,22,.02) 18%, rgba(10,18,22,.8) 100%)"
            />

            <Flex
              position="absolute"
              inset="0"
              p={{ base: 7, md: 10, lg: 12 }}
              direction="column"
              justify="space-between"
            >
              <Flex align="center" gap={3}>
                <Box w="28px" h="2px" bg={design.colors.champagne} />
                <Text fontSize="10px" color="rgba(255,255,255,.62)">
                  Személyes együttműködés
                </Text>
              </Flex>

              <Box>
                <Heading
                  as="h3"
                  fontFamily={design.fonts.sans}
                  fontSize={{ base: "44px", md: "56px", lg: "64px" }}
                  fontWeight="500"
                  letterSpacing="-0.055em"
                  color="#FFFFFF"
                >
                  Debrecen
                </Heading>

                <Text
                  mt={5}
                  maxW="370px"
                  fontSize="15px"
                  lineHeight="1.7"
                  color="rgba(255,255,255,.7)"
                >
                  Meglévő helyi jelenlét és személyes együttműködési
                  lehetőség.
                </Text>
              </Box>
            </Flex>
          </Box>

          <Flex
            minH={{ base: "500px", lg: "auto" }}
            bg={design.colors.ink}
            color="#FFFFFF"
            direction="column"
            justify="space-between"
            p={{ base: 7, md: 10, lg: 12, xl: 14 }}
          >
            <Flex justify="space-between" align="flex-start">
              <Text fontSize="10px" color="rgba(255,255,255,.44)">
                Online együttműködés
              </Text>
              <Box w="38px" h="2px" bg={design.colors.champagne} />
            </Flex>

            <Box>
              <Heading
                as="h3"
                fontFamily={design.fonts.sans}
                fontSize={{ base: "42px", md: "54px", lg: "58px", xl: "64px" }}
                fontWeight="500"
                lineHeight=".98"
                letterSpacing="-0.055em"
                color="#FFFFFF"
              >
                Budapest és
                <br />
                <Box as="span" color={design.colors.champagne}>
                  országosan.
                </Box>
              </Heading>

              <Text
                mt={8}
                maxW="390px"
                fontSize="15px"
                lineHeight="1.75"
                color="rgba(255,255,255,.57)"
              >
                Online könyvelés, digitális dokumentumkezelés és folyamatos
                kapcsolattartás budapesti és országosan működő vállalkozások
                számára.
              </Text>
            </Box>

            <Grid
              pt={9}
              borderTop="1px solid rgba(255,255,255,.1)"
              templateColumns="1fr 1fr"
              gap={8}
            >
              <Box>
                <Text fontSize="10px" color="rgba(255,255,255,.32)">
                  Dokumentumkezelés
                </Text>
                <Text mt={3} fontSize="14px" color="rgba(255,255,255,.84)">
                  Digitálisan
                </Text>
              </Box>

              <Box>
                <Text fontSize="10px" color="rgba(255,255,255,.32)">
                  Együttműködés
                </Text>
                <Text mt={3} fontSize="14px" color="rgba(255,255,255,.84)">
                  Országosan
                </Text>
              </Box>
            </Grid>
          </Flex>
        </Grid>
      </Container>
    </Box>
  );
}
