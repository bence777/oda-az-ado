import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";

function Header({ service }) {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "1.12fr .88fr" }} gap={{ base: 7, lg: 18 }} alignItems="end">
      <Box>
        <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>{service.processEyebrow}</Text>
        <Heading as="h2" mt={6} maxW="860px" fontSize={{ base: "42px", md: "58px", lg: "70px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.06em" color="#fff">{service.processTitle}</Heading>
      </Box>
      <Text maxW="500px" justifySelf={{ lg: "end" }} fontSize="14px" lineHeight="1.8" color="rgba(255,255,255,.5)">{service.processText}</Text>
    </Grid>
  );
}

function AccountingPath({ items }) {
  return (
    <Box mt={{ base: 14, md: 18 }}>
      <Grid templateColumns={{ base: "1fr", md: `repeat(${items.length},1fr)` }} borderTop="1px solid rgba(255,255,255,.18)">
        {items.map((step,index)=><Box key={step.title} py={{ base: 6, md: 8 }} pr={{ md: 8 }} borderBottom={{ base: "1px solid rgba(255,255,255,.12)", md: "0" }} position="relative"><Box display={{ base: "none", md: "block" }} position="absolute" top="-6px" left="0" w="11px" h="11px" borderRadius="50%" bg={index===items.length-1?design.colors.champagne:design.colors.ink} border="1px solid rgba(255,255,255,.35)"/><Text fontSize="9px" color={design.colors.champagne}>{String(index+1).padStart(2,'0')} / {step.label}</Text><Heading as="h3" mt={4} fontSize={{ base: "22px", md: "25px" }} fontWeight="500" lineHeight="1.15" letterSpacing="-.04em" color="#fff">{step.title}</Heading><Text mt={4} fontSize="11px" lineHeight="1.72" color="rgba(255,255,255,.48)">{step.text}</Text></Box>)}
      </Grid>
    </Box>
  );
}

function TaxPath({ items }) {
  return (
    <Grid mt={{ base: 14, md: 18 }} templateColumns={{ base: "1fr", md: ".9fr 1.2fr .9fr" }} gap={{ base: 8, md: 10 }} alignItems="center">
      <Box>
        <Text fontSize="9px" color={design.colors.champagne}>01 / {items[0].label}</Text>
        <Heading as="h3" mt={4} fontSize={{ base: "30px", md: "40px" }} fontWeight="500" lineHeight="1.05" letterSpacing="-.05em" color="#fff">{items[0].title}</Heading>
        <Text mt={5} fontSize="12px" lineHeight="1.75" color="rgba(255,255,255,.48)">{items[0].text}</Text>
      </Box>
      <Box py={{ base: 7, md: 10 }} borderTop="1px solid" borderBottom="1px solid" borderColor={design.colors.champagne}>
        {[items[1],items[2]].map((x,i)=><Box key={x.title} pt={i?7:0} mt={i?7:0} borderTop={i?"1px solid rgba(255,255,255,.13)":"0"}><Text fontSize="9px" color={design.colors.champagne}>0{i+2} / {x.label}</Text><Text mt={3} fontSize={{ base: "22px", md: "27px" }} letterSpacing="-.04em" color="#fff">{x.title}</Text><Text mt={3} fontSize="11px" lineHeight="1.7" color="rgba(255,255,255,.5)">{x.text}</Text></Box>)}
      </Box>
      <Box textAlign={{ md: "right" }}>
        <Text fontSize="9px" color={design.colors.champagne}>04 / {items[3].label}</Text>
        <Heading as="h3" mt={4} fontSize={{ base: "30px", md: "40px" }} fontWeight="500" lineHeight="1.05" letterSpacing="-.05em" color="#fff">{items[3].title}</Heading>
        <Text mt={5} ml={{ md: "auto" }} maxW="330px" fontSize="12px" lineHeight="1.75" color="rgba(255,255,255,.48)">{items[3].text}</Text>
      </Box>
    </Grid>
  );
}

function PayrollPath({ items }) {
  return (
    <Box mt={{ base: 14, md: 18 }}>
      <Flex gap={2} mb={5}>{['H','K','Sze','Cs','P'].map((d)=><Box key={d} flex="1" py={2} borderTop="1px solid rgba(255,255,255,.15)"><Text fontSize="9px" color="rgba(255,255,255,.35)">{d}</Text></Box>)}</Flex>
      <Grid templateColumns={{ base: "1fr", md: "repeat(4,1fr)" }} gap={{ base: 7, md: 8 }}>
        {items.map((step,index)=><Box key={step.title} pt={{ base: 0, md: index*5 }}><Text fontSize={{ base: "42px", md: "54px" }} fontWeight="500" lineHeight="1" letterSpacing="-.06em" color="rgba(255,255,255,.16)">{String(index+1).padStart(2,'0')}</Text><Text mt={4} fontSize="9px" color={design.colors.champagne}>{step.label}</Text><Heading as="h3" mt={3} fontSize="23px" fontWeight="500" lineHeight="1.15" letterSpacing="-.04em" color="#fff">{step.title}</Heading><Text mt={4} fontSize="11px" lineHeight="1.7" color="rgba(255,255,255,.46)">{step.text}</Text></Box>)}
      </Grid>
    </Box>
  );
}

function ManagementPath({ items }) {
  const labels = ["Kiindulópont", "Aktuális kép", "Értelmezés", "Döntés"];
  return (
    <Grid mt={{ base: 14, md: 18 }} templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 5, md: 7 }}>
      {items.map((step,index)=><Box key={step.title} p={{ base: 6, md: 7 }} minH={{ md: "230px" }} bg="transparent" border="1px solid rgba(255,255,255,.14)"><Text fontSize="9px" letterSpacing=".12em" textTransform="uppercase" color={design.colors.champagne}>{labels[index]}</Text><Heading as="h3" mt={5} fontSize={{ base: "23px", md: "29px" }} fontWeight="500" lineHeight="1.1" letterSpacing="-.04em" color="#fff">{step.title}</Heading><Text mt={4} fontSize="11px" lineHeight="1.72" color="rgba(255,255,255,.48)">{step.text}</Text></Box>)}
    </Grid>
  );
}

function BudapestPath({ items }) {
  return (
    <Box mt={{ base: 14, md: 18 }}>
      <Grid templateColumns={{ base: "1fr", lg: ".72fr 1.28fr" }} gap={{ base: 8, lg: 12 }} alignItems="stretch">
        <Box p={{ base: 6, md: 8 }} border="1px solid rgba(255,255,255,.14)" display="flex" flexDirection="column" justifyContent="space-between">
          <Box>
            <Text fontSize="9px" letterSpacing=".13em" textTransform="uppercase" color={design.colors.champagne}>Helyszíntől függetlenül</Text>
            <Text mt={5} fontSize={{ base: "48px", md: "68px" }} lineHeight=".9" letterSpacing="-.07em" color="#fff">Online<br/>együttműködés</Text>
          </Box>
          <Text mt={10} fontSize="11px" lineHeight="1.7" color="rgba(255,255,255,.45)">A helyszín helyett a rendezett anyagátadás, a rendszeres egyeztetés és az érthető visszajelzés tartja össze a folyamatot.</Text>
        </Box>
        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={{ base: 5, md: 6 }}>
          {items.map((step,index)=><Box key={step.title} p={{ base: 5, md: 6 }} bg="rgba(255,255,255,.035)" border="1px solid rgba(255,255,255,.12)"><Text fontSize="9px" color={design.colors.champagne}>{String(index+1).padStart(2,'0')}</Text><Text mt={5} fontSize={{ base: "19px", md: "22px" }} fontWeight="600" lineHeight="1.14" letterSpacing="-.035em" color="#fff">{step.title}</Text><Text mt={4} fontSize="11px" lineHeight="1.68" color="rgba(255,255,255,.46)">{step.text}</Text></Box>)}
        </Grid>
      </Grid>
    </Box>
  );
}

function SwitchPath({ items }) {
  const groups = [items.slice(0,2),items.slice(2,4),items.slice(4,6)];
  const labels = ["01 · Feltérképezés", "02 · Átadás", "03 · Átállás"];
  return (
    <Grid mt={{ base: 14, md: 18 }} templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap={{ base: 5, md: 6 }}>
      {groups.map((group,index)=><Box key={labels[index]} p={{ base: 6, md: 7 }} bg={index===1?"rgba(177,138,85,.10)":"transparent"} border="1px solid rgba(255,255,255,.14)"><Text fontSize="9px" color={design.colors.champagne}>{labels[index]}</Text>{group.map((step,i)=><Box key={step.title} mt={6} pt={i?6:0} borderTop={i?"1px solid rgba(255,255,255,.12)":"0"}><Heading as="h3" fontSize={{ base: "20px", md: "23px" }} fontWeight="500" lineHeight="1.13" letterSpacing="-.04em" color="#fff">{step.title}</Heading><Text mt={3} fontSize="11px" lineHeight="1.7" color="rgba(255,255,255,.47)">{step.text}</Text></Box>)}</Box>)}
    </Grid>
  );
}

export default function ServiceProcessSection({ service }) {
  let body = <AccountingPath items={service.process} />;
  if (service.slug === "adotanacsadas") body = <TaxPath items={service.process} />;
  if (service.slug === "berszamfejtes") body = <PayrollPath items={service.process} />;
  if (service.slug === "vezetoi-informacio") body = <ManagementPath items={service.process} />;
  if (service.slug === "konyveles-budapest") body = <BudapestPath items={service.process} />;
  if (service.slug === "konyvelovaltas") body = <SwitchPath items={service.process} />;
  return <Section py={{ base: 22, md: 30, lg: 36 }} bg={design.colors.ink} color="#fff"><PageContainer><Header service={service}/>{body}</PageContainer></Section>;
}
