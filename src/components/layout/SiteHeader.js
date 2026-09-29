import { useEffect, useState } from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import design from "../../design/system";

const navItems = [
  { label: "Szolgáltatások", href: "/szolgaltatasok" },
  { label: "Működésünk", href: "/mukodesunk" },
  { label: "Könyvelőváltás", href: "/konyvelovaltas" },
  { label: "Rólunk", href: "/rolunk" },
  { label: "Helyszínek", href: "/helyszinek" },
];

export default function SiteHeader() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Box
      as="header"
      position="relative"
      zIndex="30"
      bg={design.colors.white}
      opacity={mounted ? 1 : 0}
      transform={mounted ? "translateY(0)" : "translateY(-12px)"}
      transition="opacity .8s ease .1s, transform .8s ease .1s"
    >
      <Container maxW={design.sizes.container} px={design.spacing.pageX}>
        <Flex h={{ base: "78px", md: "92px", lg: "104px" }} align="center" justify="space-between">
          <Text
            as="a"
            href="/"
            fontSize={{ base: "19px", md: "22px" }}
            fontWeight="650"
            letterSpacing="-0.055em"
            color={design.colors.ink}
            lineHeight="1"
          >
            ODA-AZ-ADÓ
          </Text>

          <Flex display={{ base: "none", lg: "flex" }} align="center" gap={{ lg: 6, xl: 8 }}>
            {navItems.map((item) => (
              <Text
                key={item.label}
                as="a"
                href={item.href}
                position="relative"
                fontSize="11px"
                fontWeight="500"
                color={design.colors.muted}
                transition={design.transition}
                _after={{
                  content: '\"\"',
                  position: "absolute",
                  left: 0,
                  bottom: "-7px",
                  w: "100%",
                  h: "1px",
                  bg: design.colors.champagne,
                  transform: "scaleX(0)",
                  transformOrigin: "right",
                  transition: design.transition,
                }}
                _hover={{
                  color: design.colors.ink,
                  _after: { transform: "scaleX(1)", transformOrigin: "left" },
                }}
              >
                {item.label}
              </Text>
            ))}
          </Flex>

          <Text
            as="a"
            href="/kapcsolat"
            display={{ base: "none", sm: "block" }}
            position="relative"
            fontSize="11px"
            fontWeight="600"
            color={design.colors.ink}
            pb="5px"
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
            Ajánlatot kérek
          </Text>

          <Box
            as="button"
            type="button"
            aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
            aria-expanded={menuOpen}
            display={{ base: "block", lg: "none" }}
            position="relative"
            w="30px"
            h="30px"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <Box
              position="absolute"
              left="2px"
              top={menuOpen ? "14px" : "10px"}
              w="26px"
              h="1px"
              bg={design.colors.ink}
              transform={menuOpen ? "rotate(45deg)" : "rotate(0)"}
              transition="top .25s ease, transform .25s ease"
            />
            <Box
              position="absolute"
              right="2px"
              top={menuOpen ? "14px" : "19px"}
              w={menuOpen ? "26px" : "18px"}
              h="1px"
              bg={design.colors.ink}
              transform={menuOpen ? "rotate(-45deg)" : "rotate(0)"}
              transition="top .25s ease, width .25s ease, transform .25s ease"
            />
          </Box>
        </Flex>

        <Box
          display={{ base: "block", lg: "none" }}
          maxH={menuOpen ? "520px" : "0"}
          opacity={menuOpen ? 1 : 0}
          overflow="hidden"
          borderTop={menuOpen ? "1px solid" : "0 solid"}
          borderColor={design.colors.border}
          transition="max-height .45s cubic-bezier(.16,1,.3,1), opacity .3s ease"
        >
          <Box py={5}>
            {[...navItems, { label: "Kapcsolat", href: "/kapcsolat" }].map((item) => (
              <Text
                key={item.label}
                as="a"
                href={item.href}
                display="block"
                py={3}
                fontSize="15px"
                fontWeight="500"
                color={design.colors.ink}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Text>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
