import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

function Header({ service }) {
  return (
    <Grid templateColumns={{ base: "1fr", lg: ".78fr 1.22fr" }} gap={{ base: 7, lg: 18 }} alignItems="end" mb={{ base: 10, md: 14 }}>
      <Box>
        <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>{service.scopeEyebrow}</Text>
        <Heading as="h2" mt={6} maxW="720px" fontSize={{ base: "40px", md: "56px", lg: "68px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.06em" color={design.colors.ink}>{service.scopeTitle}</Heading>
      </Box>
      <Text maxW="620px" justifySelf={{ lg: "end" }} fontSize={{ base: "14px", md: "15px" }} lineHeight="1.8" color={design.colors.muted}>{service.scopeIntro}</Text>
    </Grid>
  );
}

function AccountingSpread({ items }) {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "1.12fr .88fr" }} gap={{ base: 6, md: 8 }}>
      <Box bg={design.colors.ink} color="#fff" p={{ base: 7, md: 9 }} minH={{ lg: "470px" }} display="flex" flexDirection="column" justifyContent="space-between">
        <Box>
          <Text fontSize="9px" color={design.colors.champagne}>A könyvelés magja</Text>
          <Heading as="h3" mt={5} maxW="560px" fontSize={{ base: "30px", md: "42px" }} fontWeight="500" lineHeight="1.05" letterSpacing="-.05em">{items[0].title}</Heading>
        </Box>
        <Text mt={10} maxW="520px" fontSize="13px" lineHeight="1.8" color="rgba(255,255,255,.55)">{items[0].text}</Text>
      </Box>

      <Grid gap={{ base: 6, md: 8 }}>
        {items.slice(1, 3).map((item, index) => (
          <Box key={item.title} bg={index === 0 ? design.colors.white : design.colors.offWhite} border={index === 0 ? "1px solid" : "0"} borderColor={design.colors.border} p={{ base: 6, md: 7 }} minH={{ md: "220px" }}>
            <Text fontSize="9px" color={design.colors.champagne}>0{index + 2}</Text>
            <Heading as="h3" mt={5} fontSize={{ base: "23px", md: "28px" }} fontWeight="600" lineHeight="1.12" letterSpacing="-.04em" color={design.colors.ink}>{item.title}</Heading>
            <Text mt={4} fontSize="11px" lineHeight="1.72" color={design.colors.muted}>{item.text}</Text>
          </Box>
        ))}
      </Grid>

      <Grid gridColumn={{ lg: "1 / -1" }} templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={{ base: 5, md: 6 }}>
        {items.slice(3).map((item, index) => (
          <Box key={item.title} pt={6} borderTop="1px solid" borderColor={index === 0 ? design.colors.champagne : design.colors.border}>
            <Heading as="h3" fontSize={{ base: "20px", md: "22px" }} fontWeight="600" lineHeight="1.2" letterSpacing="-.035em" color={design.colors.ink}>{item.title}</Heading>
            <Text mt={4} fontSize="11px" lineHeight="1.72" color={design.colors.muted}>{item.text}</Text>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

function TaxQuestions({ items }) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 6, md: 8 }}>
      {items.slice(0, 4).map((item, index) => (
        <Box key={item.title} p={{ base: 6, md: 8 }} minH={{ md: index === 0 || index === 3 ? "330px" : "270px" }} bg={index === 0 ? design.colors.ink : index === 3 ? design.colors.offWhite : design.colors.white} border={index === 0 || index === 3 ? "0" : "1px solid"} borderColor={design.colors.border}>
          <Text fontSize="9px" color={design.colors.champagne}>Kérdés {String(index + 1).padStart(2, "0")}</Text>
          <Heading as="h3" mt={5} fontSize={{ base: "25px", md: "32px" }} fontWeight="500" lineHeight="1.08" letterSpacing="-.045em" color={index === 0 ? "#fff" : design.colors.ink}>{item.title}</Heading>
          <Text mt={5} maxW="520px" fontSize="12px" lineHeight="1.75" color={index === 0 ? "rgba(255,255,255,.52)" : design.colors.muted}>{item.text}</Text>
        </Box>
      ))}
      {items.slice(4).map((item) => (
        <Box key={item.title} gridColumn={{ md: "span 1" }} px={{ base: 2, md: 0 }} py={5}>
          <Text fontSize="14px" fontWeight="600" color={design.colors.ink}>{item.title}</Text>
          <Text mt={2} fontSize="11px" lineHeight="1.7" color={design.colors.muted}>{item.text}</Text>
        </Box>
      ))}
    </Grid>
  );
}

function PayrollBoard({ items }) {
  return (
    <Box bg={design.colors.ink} color="#fff" p={{ base: 6, md: 8 }}>
      <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3,1fr)" }} gap="1px" bg="rgba(255,255,255,.13)">
        {items.map((item, index) => (
          <Box key={item.title} bg={index === 1 ? "rgba(177,138,85,.13)" : design.colors.ink} p={{ base: 5, md: 6 }} minH={{ md: "190px" }}>
            <Text fontSize="9px" color={design.colors.champagne}>{String(index + 1).padStart(2, "0")}</Text>
            <Text mt={5} fontSize={{ base: "19px", md: "22px" }} fontWeight="600" lineHeight="1.15" letterSpacing="-.035em">{item.title}</Text>
            <Text mt={4} fontSize="11px" lineHeight="1.68" color="rgba(255,255,255,.5)">{item.text}</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}

function ManagementQuestions({ items }) {
  const prompts = ["Most", "Következő", "Eltérés", "Döntés"];
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 6, md: 8 }}>
      {items.slice(0, 4).map((item, index) => (
        <Box key={item.title} p={{ base: 6, md: 8 }} bg={index === 0 ? design.colors.ink : index === 3 ? design.colors.offWhite : design.colors.white} border={index === 0 || index === 3 ? "0" : "1px solid"} borderColor={design.colors.border} minH={{ md: "300px" }}>
          <Text fontSize="10px" letterSpacing=".12em" textTransform="uppercase" color={design.colors.champagne}>{prompts[index]}</Text>
          <Heading as="h3" mt={6} fontSize={{ base: "26px", md: "34px" }} fontWeight="500" lineHeight="1.08" letterSpacing="-.048em" color={index === 0 ? "#fff" : design.colors.ink}>{item.title}</Heading>
          <Text mt={5} fontSize="12px" lineHeight="1.75" color={index === 0 ? "rgba(255,255,255,.5)" : design.colors.muted}>{item.text}</Text>
        </Box>
      ))}
      {items.length > 4 ? (
        <Box gridColumn={{ md: "1 / -1" }} pt={7} borderTop="1px solid" borderColor={design.colors.border}>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
            {items.slice(4).map((item) => <Box key={item.title}><Text fontSize="14px" fontWeight="600" color={design.colors.ink}>{item.title}</Text><Text mt={2} fontSize="11px" lineHeight="1.7" color={design.colors.muted}>{item.text}</Text></Box>)}
          </Grid>
        </Box>
      ) : null}
    </Grid>
  );
}

function BudapestScope({ items }) {
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={{ base: 6, md: 7 }}>
      {items.slice(0, 3).map((item, index) => (
        <Box key={item.title} p={{ base: 6, md: 7 }} bg={index === 1 ? design.colors.ink : design.colors.white} border={index === 1 ? "0" : "1px solid"} borderColor={design.colors.border} minH={{ md: "300px" }}>
          <Text fontSize="9px" color={design.colors.champagne}>0{index + 1}</Text>
          <Heading as="h3" mt={6} fontSize={{ base: "24px", md: "29px" }} fontWeight="600" lineHeight="1.1" letterSpacing="-.04em" color={index === 1 ? "#fff" : design.colors.ink}>{item.title}</Heading>
          <Text mt={5} fontSize="11px" lineHeight="1.72" color={index === 1 ? "rgba(255,255,255,.5)" : design.colors.muted}>{item.text}</Text>
        </Box>
      ))}
      <Box gridColumn={{ md: "1 / -1" }} bg={design.colors.offWhite} p={{ base: 6, md: 8 }}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={{ base: 6, md: 8 }}>
          {items.slice(3).map((item) => <Box key={item.title}><Text fontSize="15px" fontWeight="600" color={design.colors.ink}>{item.title}</Text><Text mt={3} fontSize="11px" lineHeight="1.7" color={design.colors.muted}>{item.text}</Text></Box>)}
        </Grid>
      </Box>
    </Grid>
  );
}

function SwitchPhases({ items }) {
  const groups = [items.slice(0, 2), items.slice(2, 4), items.slice(4, 6)];
  const titles = ["Áttekintés", "Átadás", "Új működés"];
  return (
    <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={{ base: 6, md: 7 }}>
      {groups.map((group, groupIndex) => (
        <Box key={titles[groupIndex]} p={{ base: 6, md: 7 }} bg={groupIndex === 1 ? design.colors.ink : groupIndex === 2 ? design.colors.offWhite : design.colors.white} border={groupIndex === 1 || groupIndex === 2 ? "0" : "1px solid"} borderColor={design.colors.border}>
          <Text fontSize="9px" letterSpacing=".13em" textTransform="uppercase" color={design.colors.champagne}>{titles[groupIndex]}</Text>
          {group.map((item, index) => (
            <Box key={item.title} mt={7} pt={index ? 6 : 0} borderTop={index ? `1px solid ${groupIndex === 1 ? "rgba(255,255,255,.14)" : design.colors.border}` : "0"}>
              <Text fontSize="18px" fontWeight="600" letterSpacing="-.03em" color={groupIndex === 1 ? "#fff" : design.colors.ink}>{item.title}</Text>
              <Text mt={3} fontSize="11px" lineHeight="1.7" color={groupIndex === 1 ? "rgba(255,255,255,.5)" : design.colors.muted}>{item.text}</Text>
            </Box>
          ))}
        </Box>
      ))}
    </Grid>
  );
}

export default function ServiceScopeSection({ service }) {
  let body = <AccountingSpread items={service.scope} />;
  if (service.slug === "adotanacsadas") body = <TaxQuestions items={service.scope} />;
  if (service.slug === "berszamfejtes") body = <PayrollBoard items={service.scope} />;
  if (service.slug === "vezetoi-informacio") body = <ManagementQuestions items={service.scope} />;
  if (service.slug === "konyveles-budapest") body = <BudapestScope items={service.scope} />;
  if (service.slug === "konyvelovaltas") body = <SwitchPhases items={service.scope} />;

  return (
    <Section id="reszletek" py={{ base: 20, md: 28, lg: 34 }} bg={design.colors.offWhite}>
      <PageContainer>
        <Header service={service} />
        {body}
      </PageContainer>
    </Section>
  );
}
