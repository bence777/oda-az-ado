import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import SectionEyebrow from "../ui/SectionEyebrow";
import design from "../../design/system";
import { serviceAreas } from "../../data/services";

function Link({ service, light = false }) {
  return (
    <Text as="a" href={service.href} display="inline-block" mt={8} pb="4px" borderBottom="1px solid" borderColor={design.colors.champagne} fontSize="11px" fontWeight="600" color={light ? "#fff" : design.colors.ink}>
      {service.linkLabel}
    </Text>
  );
}

function Bookkeeping({ service }) {
  return (
    <Grid id={service.id} scrollMarginTop="120px" templateColumns={{ base: "1fr", lg: "1.04fr .96fr" }} minH={{ lg: "650px" }} bg={design.colors.ink} color="#fff">
      <Box p={{ base: 7, md: 10, lg: 12 }} display="flex" flexDirection="column" justifyContent="space-between">
        <Box>
          <Text fontSize="10px" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>{service.eyebrow}</Text>
          <Heading as="h3" mt={7} maxW="720px" fontSize={{ base: "42px", md: "60px", lg: "72px" }} fontWeight="500" lineHeight=".95" letterSpacing="-.064em">{service.title}</Heading>
          <Text mt={7} maxW="700px" fontSize={{ base: "20px", md: "27px" }} lineHeight="1.28" letterSpacing="-.035em" color="rgba(255,255,255,.88)">{service.lead}</Text>
        </Box>
        <Box mt={12}>
          <Text maxW="620px" fontSize="13px" lineHeight="1.8" color="rgba(255,255,255,.5)">{service.text}</Text>
          <Link service={service} light />
        </Box>
      </Box>
      <Box position="relative" minH={{ base: "430px", lg: "auto" }} overflow="hidden">
        <Box position="absolute" inset="0" backgroundImage="linear-gradient(180deg,rgba(16,38,51,.05),rgba(16,38,51,.72)), url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&fm=jpg&q=82&w=1500')" backgroundSize="cover" backgroundPosition="center" />
        <Box position="absolute" left={{ base: 6, md: 8 }} right={{ base: 6, md: 8 }} bottom={{ base: 6, md: 8 }}>
          <Grid templateColumns="1fr 1fr" gap="1px" bg="rgba(255,255,255,.18)" border="1px solid rgba(255,255,255,.18)">
            {service.points.slice(0, 4).map((point) => <Box key={point} bg="rgba(16,38,51,.78)" p={5}><Text fontSize="11px" lineHeight="1.5" color="rgba(255,255,255,.76)">{point}</Text></Box>)}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}

function Tax({ service }) {
  return (
    <Box id={service.id} scrollMarginTop="120px" py={{ base: 18, md: 24, lg: 30 }}>
      <Grid templateColumns={{ base: "1fr", lg: ".82fr 1.18fr" }} gap={{ base: 10, lg: 18 }} alignItems="start">
        <Box position={{ lg: "sticky" }} top={{ lg: "130px" }}>
          <Text fontSize="10px" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>{service.eyebrow}</Text>
          <Heading as="h3" mt={6} maxW="620px" fontSize={{ base: "42px", md: "58px", lg: "68px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.06em" color={design.colors.ink}>{service.title}</Heading>
          <Text mt={7} maxW="560px" fontSize="14px" lineHeight="1.8" color={design.colors.muted}>{service.text}</Text>
          <Link service={service} />
        </Box>
        <Box>
          <Text maxW="760px" fontSize={{ base: "28px", md: "42px", lg: "48px" }} lineHeight="1.08" letterSpacing="-.05em" color={design.colors.graphite}>{service.lead}</Text>
          <Grid mt={{ base: 10, md: 14 }} templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={{ base: 8, md: 10 }}>
            {service.points.slice(0, 4).map((point, index) => (
              <Box key={point} pt={6} borderTop="1px solid" borderColor={index === 0 ? design.colors.champagne : design.colors.border}>
                <Text fontSize="10px" color={design.colors.quiet}>{String(index + 1).padStart(2, "0")}</Text>
                <Text mt={4} maxW="300px" fontSize={{ base: "18px", md: "21px" }} lineHeight="1.35" letterSpacing="-.03em" color={design.colors.ink}>{point}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

function Payroll({ service }) {
  const phases = ["Jogviszony", "Változás", "Számfejtés", "Bevallás"];
  return (
    <Box id={service.id} scrollMarginTop="120px" bg={design.colors.offWhite} p={{ base: 7, md: 10, lg: 12 }}>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 10, lg: 18 }} alignItems="center">
        <Box>
          <Text fontSize="10px" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>{service.eyebrow}</Text>
          <Heading as="h3" mt={6} fontSize={{ base: "42px", md: "60px", lg: "72px" }} fontWeight="500" lineHeight=".96" letterSpacing="-.064em" color={design.colors.ink}>{service.title}</Heading>
          <Text mt={7} maxW="650px" fontSize={{ base: "20px", md: "25px" }} lineHeight="1.32" letterSpacing="-.035em" color={design.colors.graphite}>{service.lead}</Text>
          <Text mt={7} maxW="610px" fontSize="13px" lineHeight="1.8" color={design.colors.muted}>{service.text}</Text>
          <Link service={service} />
        </Box>
        <Box bg={design.colors.white} border="1px solid" borderColor={design.colors.border} p={{ base: 6, md: 8 }}>
          <Flex justify="space-between" align="baseline" gap={5} pb={5} borderBottom="1px solid" borderColor={design.colors.border}>
            <Text fontSize="10px" letterSpacing=".13em" textTransform="uppercase" color={design.colors.quiet}>Egy havi ritmus</Text>
            <Text fontSize="10px" color={design.colors.champagne}>rendezett folyamat</Text>
          </Flex>
          <Grid mt={7} templateColumns="1fr 1fr" gap={{ base: 5, md: 7 }}>
            {phases.map((phase, index) => (
              <Box key={phase} minH={{ base: "130px", md: "150px" }} p={{ base: 4, md: 5 }} bg={design.colors.offWhite} display="flex" flexDirection="column" justifyContent="space-between">
                <Text fontSize="9px" color={design.colors.champagne}>{String(index + 1).padStart(2, "0")}</Text>
                <Text fontSize={{ base: "18px", md: "21px" }} fontWeight="600" letterSpacing="-.03em" color={design.colors.ink}>{phase}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

function Management({ service }) {
  const questions = ["Mi történt?", "Mi várható?", "Mi tér el?", "Mi igényel döntést?"];
  return (
    <Grid id={service.id} scrollMarginTop="120px" templateColumns={{ base: "1fr", lg: ".95fr 1.05fr" }} bg={design.colors.white}>
      <Box p={{ base: 7, md: 10, lg: 12 }}>
        <Text fontSize="10px" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>{service.eyebrow}</Text>
        <Heading as="h3" mt={6} fontSize={{ base: "42px", md: "60px", lg: "72px" }} fontWeight="500" lineHeight=".96" letterSpacing="-.064em" color={design.colors.ink}>{service.title}</Heading>
        <Text mt={7} maxW="680px" fontSize={{ base: "20px", md: "26px" }} lineHeight="1.32" letterSpacing="-.035em" color={design.colors.graphite}>{service.lead}</Text>
        <Text mt={7} maxW="610px" fontSize="13px" lineHeight="1.8" color={design.colors.muted}>{service.text}</Text>
        <Link service={service} />
      </Box>
      <Box bg={design.colors.ink} color="#fff" p={{ base: 7, md: 10, lg: 12 }} display="flex" flexDirection="column" justifyContent="center">
        <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Vezetői nézőpont</Text>
        <Grid mt={8} templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap="1px" bg="rgba(255,255,255,.14)">
          {questions.map((question, index) => (
            <Box key={question} bg={design.colors.ink} p={{ base: 5, md: 6 }} minH={{ base: "145px", md: "175px" }} display="flex" flexDirection="column" justifyContent="space-between">
              <Text fontSize="9px" color="rgba(255,255,255,.32)">0{index + 1}</Text>
              <Text fontSize={{ base: "22px", md: "28px" }} lineHeight="1.08" letterSpacing="-.04em">{question}</Text>
            </Box>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}

export default function ServiceDetailsSection() {
  return (
    <Section py={{ base: 20, md: 28, lg: 34 }} bg={design.colors.offWhite}>
      <PageContainer>
        <Grid templateColumns={{ base: "1fr", lg: ".78fr 1.22fr" }} gap={{ base: 8, lg: 18 }} alignItems="end" mb={{ base: 12, md: 18 }}>
          <Box>
            <SectionEyebrow>Komplex szakmai háttér</SectionEyebrow>
            <Heading as="h2" mt={6} maxW="700px" fontSize={{ base: "40px", md: "56px", lg: "68px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.06em" color={design.colors.ink}>Négy terület, négy külön feladat. Egy közös felelősség.</Heading>
          </Box>
          <Text maxW="600px" justifySelf={{ lg: "end" }} fontSize={{ base: "14px", md: "15px" }} lineHeight="1.8" color={design.colors.muted}>Az oldalon nem ugyanazt a szolgáltatást nevezzük át négyszer. Mindegyik terület más problémát old meg, de ugyanarra a rendezett pénzügyi háttérre épül.</Text>
        </Grid>

        <Flex direction="column" gap={{ base: 10, md: 14 }}>
          <Bookkeeping service={serviceAreas[0]} />
          <Tax service={serviceAreas[1]} />
          <Payroll service={serviceAreas[2]} />
          <Management service={serviceAreas[3]} />
        </Flex>
      </PageContainer>
    </Section>
  );
}
