import { useState } from "react";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "./PageContainer";
import Section from "./Section";
import design from "../../design/system";

function normalizeItem(item) {
  if (Array.isArray(item)) return { q: item[0], a: item[1] };
  return item;
}

export default function FaqAccordionSection({
  items,
  title,
  intro,
  bg = design.colors.white,
  defaultOpen = 0,
}) {
  const normalized = (items || []).map(normalizeItem);
  const [open, setOpen] = useState(defaultOpen);

  if (!normalized.length) return null;

  return (
    <Section py={{ base: 20, md: 28, lg: 34 }} bg={bg}>
      <PageContainer>
        <Grid
          templateColumns={{ base: "1fr", lg: ".72fr 1.28fr" }}
          gap={{ base: 10, lg: 18, xl: 24 }}
          alignItems="start"
        >
          <Box
            position="sticky"
            top={{ base: "16px", lg: "42px" }}
            zIndex="2"
            alignSelf="start"
            py={{ base: 3, lg: 0 }}
            bg={bg}
          >
            <Text
              fontSize="10px"
              fontWeight="600"
              letterSpacing=".16em"
              textTransform="uppercase"
              color={design.colors.champagne}
            >
              Gyakori kérdések
            </Text>
            <Heading
              as="h2"
              mt={6}
              maxW="580px"
              fontFamily={design.fonts.sans}
              fontSize={{ base: "38px", md: "52px", lg: "60px" }}
              fontWeight="500"
              lineHeight="1"
              letterSpacing="-.055em"
              color={design.colors.ink}
            >
              {title}
            </Heading>
            {intro ? (
              <Text
                mt={7}
                maxW="480px"
                fontSize="14px"
                lineHeight="1.76"
                color={design.colors.muted}
              >
                {intro}
              </Text>
            ) : null}
          </Box>

          <Box borderTop="1px solid" borderColor={design.colors.border}>
            {normalized.map((item, index) => {
              const active = open === index;
              const answerId = `faq-answer-${index}-${item.q
                .toLowerCase()
                .replace(/[^a-z0-9áéíóöőúüű]+/gi, "-")}`;

              return (
                <Box
                  key={item.q}
                  borderBottom="1px solid"
                  borderColor={design.colors.border}
                >
                  <Grid
                    as="button"
                    type="button"
                    onClick={() => setOpen(active ? -1 : index)}
                    aria-expanded={active}
                    aria-controls={answerId}
                    w="100%"
                    templateColumns={{ base: "36px 1fr 34px", md: "48px 1fr 38px" }}
                    gap={{ base: 3, md: 5 }}
                    alignItems="center"
                    py={{ base: 6, md: 7 }}
                    px="0"
                    textAlign="left"
                    bg="transparent"
                    color={design.colors.ink}
                    cursor="pointer"
                    _hover={{ color: design.colors.graphite }}
                  >
                    <Text
                      fontSize="9px"
                      fontWeight="600"
                      letterSpacing=".08em"
                      color={active ? design.colors.champagne : design.colors.quiet}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Text>

                    <Text
                      fontSize={{ base: "18px", md: "21px" }}
                      fontWeight="500"
                      lineHeight="1.28"
                      letterSpacing="-.03em"
                    >
                      {item.q}
                    </Text>

                    <Box
                      position="relative"
                      w={{ base: "30px", md: "34px" }}
                      h={{ base: "30px", md: "34px" }}
                      border="1px solid"
                      borderColor={active ? design.colors.champagne : design.colors.border}
                      borderRadius="50%"
                      transition={design.transition}
                    >
                      <Box
                        position="absolute"
                        left="8px"
                        right="8px"
                        top="50%"
                        h="1px"
                        bg={active ? design.colors.champagne : design.colors.ink}
                        transform="translateY(-.5px)"
                      />
                      <Box
                        position="absolute"
                        top="8px"
                        bottom="8px"
                        left="50%"
                        w="1px"
                        bg={active ? design.colors.champagne : design.colors.ink}
                        transform={active ? "translateX(-.5px) rotate(90deg)" : "translateX(-.5px)"}
                        opacity={active ? 0 : 1}
                        transition={design.transition}
                      />
                    </Box>
                  </Grid>

                  <Box
                    id={answerId}
                    display="grid"
                    gridTemplateRows={active ? "1fr" : "0fr"}
                    transition="grid-template-rows .38s cubic-bezier(.16,1,.3,1)"
                  >
                    <Box overflow="hidden">
                      <Text
                        pb={{ base: 7, md: 8 }}
                        pl={{ base: "39px", md: "53px" }}
                        pr={{ base: 0, md: 16 }}
                        maxW="820px"
                        fontSize="14px"
                        lineHeight="1.82"
                        color={design.colors.muted}
                      >
                        {item.a}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Grid>
      </PageContainer>
    </Section>
  );
}
