import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";
import { trustItems } from "../../data/home";

export default function TrustSection() {
  return (
    <Box pt={{ base: 20, md: 28, lg: 36 }} pb={{ base: 20, md: 26, lg: 32 }}>
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1.15fr .85fr" }}
          gap={{ base: 8, lg: 20 }}
          alignItems="end"
          pb={{ base: 14, md: 18 }}
        >
          <Heading
            as="h2"
            maxW="760px"
            fontFamily={design.fonts.sans}
            fontSize={{ base: "38px", sm: "46px", md: "56px", lg: "64px" }}
            fontWeight="500"
            lineHeight="1"
            letterSpacing="-0.055em"
            color={design.colors.ink}
          >
            A pontosság nálunk
            <Box as="span" color={design.colors.graphite}>
              {" "}nem extra.
            </Box>
            <br />
            <Box as="span" color={design.colors.champagne}>
              Alap.
            </Box>
          </Heading>

          <Text
            maxW="440px"
            justifySelf={{ lg: "end" }}
            fontSize={{ base: "15px", md: "16px" }}
            lineHeight="1.7"
            color={design.colors.muted}
          >
            A vállalkozása pénzügyi hátterében nincs helye találgatásnak.
            Rendezett folyamatokkal, követhető munkával és érthető
            információval dolgozunk.
          </Text>
        </Grid>

        <Grid
          templateColumns={{ base: "1fr 1fr", lg: "repeat(4,1fr)" }}
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor={design.colors.border}
        >
          {trustItems.map((item, index) => (
            <Box
              key={item.value}
              minH={{ base: "200px", lg: "250px" }}
              py={{ base: 7, md: 9 }}
              px={{ base: index % 2 ? 5 : 0, md: 6, lg: 7 }}
              borderLeft={{
                base: index % 2 ? "1px solid" : "none",
                lg: index ? "1px solid" : "none",
              }}
              borderTop={{
                base: index > 1 ? "1px solid" : "none",
                lg: "none",
              }}
              borderColor={design.colors.border}
            >
              <Box w="28px" h="2px" bg={design.colors.champagne} mb={6} />

              <Text
                fontSize={{ base: "30px", md: "37px", lg: "42px" }}
                fontWeight="500"
                lineHeight="1"
                letterSpacing="-0.055em"
                color={design.colors.ink}
              >
                {item.value}
              </Text>

              <Text
                mt={8}
                maxW="220px"
                fontSize="14px"
                fontWeight="600"
                lineHeight="1.3"
                color={design.colors.graphite}
              >
                {item.title}
              </Text>

              <Text
                mt={3}
                maxW="220px"
                fontSize="12px"
                lineHeight="1.6"
                color={design.colors.quiet}
              >
                {item.text}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
