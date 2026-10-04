import { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import design from "../../design/system";

export default function FinalCta() {
  return (
    <Box
      id="kapcsolat"
      position="relative"
      bg={design.colors.ink}
      color="#FFFFFF"
      py={{ base: 24, md: 32, lg: 40, xl: 44 }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="3px"
        bg={design.colors.champagne}
      />

      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Grid
          templateColumns={{ base: "1fr", lg: "1.3fr .7fr" }}
          gap={{ base: 12, lg: 20 }}
          alignItems="end"
        >
          <Heading
            as="h2"
            maxW="900px"
            fontFamily={design.fonts.sans}
            fontSize={{ base: "50px", sm: "60px", md: "78px", lg: "92px", xl: "104px" }}
            fontWeight="500"
            lineHeight=".91"
            letterSpacing="-0.07em"
            color="#FFFFFF"
          >
            Legyen rendben
            <br />
            <Box as="span" color={design.colors.champagne}>
              a könyvelése.
            </Box>
          </Heading>

          <Box maxW="370px" justifySelf={{ lg: "end" }}>
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              lineHeight="1.75"
              color="rgba(255,255,255,.56)"
            >
              Beszéljük át, milyen könyvelési és szakmai háttérre van
              szüksége vállalkozásának.
            </Text>

            <Button
              as="a"
              href="/kapcsolat"
              mt={8}
              h="54px"
              px={9}
              borderRadius="0"
              bg={design.colors.champagne}
              color={design.colors.ink}
              fontSize="11px"
              fontWeight="700"
              transition="background .3s ease, transform .3s ease"
              _hover={{
                bg: "#FFFFFF",
                transform: "translateY(-2px)",
              }}
            >
              Ajánlatot kérek
            </Button>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
