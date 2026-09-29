import Head from "next/head";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import PageShell from "../layout/PageShell";
import design from "../../design/system";

export function LegalSection({ title, children }) {
  return (
    <Box pt={{ base: 9, md: 11 }} borderTop={`1px solid ${design.colors.border}`}>
      <Heading as="h2" fontFamily={design.fonts.sans} fontSize={{ base: "24px", md: "30px" }} fontWeight="600" letterSpacing="-.035em" color={design.colors.ink}>
        {title}
      </Heading>
      <Box
        mt={5}
        fontSize="13px"
        lineHeight="1.8"
        color={design.colors.muted}
        css={{
          "& p + p": { marginTop: "12px" },
          "& ul": { paddingLeft: "20px", marginTop: "12px" },
          "& li + li": { marginTop: "7px" },
          "& a": { textDecoration: "underline", textUnderlineOffset: "3px" },
          "& strong": { color: design.colors.ink, fontWeight: 650 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function LegalPage({ title, description, canonicalPath, updated = "2026. szeptember 29.", children }) {
  return (
    <PageShell>
      <Head>
        <title>{title} | ODA-AZ-ADÓ</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://www.odaazado.hu${canonicalPath}`} />
      </Head>
      <Box pt={{ base: 28, md: 36 }} pb={{ base: 20, md: 28 }}>
        <Container maxW="980px" px={design.spacing.pageX}>
          <Text fontSize="10px" fontWeight="650" letterSpacing=".12em" textTransform="uppercase" color={design.colors.champagne}>Jogi tájékoztató</Text>
          <Heading as="h1" mt={5} fontFamily={design.fonts.sans} fontSize={{ base: "42px", md: "62px" }} fontWeight="520" lineHeight="1" letterSpacing="-.055em" color={design.colors.ink}>
            {title}
          </Heading>
          <Text mt={5} maxW="760px" fontSize="14px" lineHeight="1.75" color={design.colors.muted}>{description}</Text>
          <Text mt={3} fontSize="10px" color={design.colors.quiet}>Hatályos / utolsó frissítés: {updated}</Text>
          <Box mt={{ base: 12, md: 16 }} display="grid" gap={{ base: 10, md: 12 }}>{children}</Box>
        </Container>
      </Box>
    </PageShell>
  );
}
