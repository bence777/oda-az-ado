import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import design from "../../design/system";

function AccountingVisual() {
  return (
    <Box position="relative" minH={{ base: "430px", md: "560px" }} overflow="hidden" bg={design.colors.ink}>
      <Box position="absolute" inset="0" backgroundImage="linear-gradient(180deg,rgba(16,38,51,.08),rgba(16,38,51,.82)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&fm=jpg&q=82&w=1800')" backgroundSize="cover" backgroundPosition="center" />
      <Box position="absolute" left={{ base: 6, md: 8 }} right={{ base: 6, md: 8 }} bottom={{ base: 7, md: 8 }} color="#fff">
        <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Rendezett háttér</Text>
        <Text mt={4} maxW="520px" fontSize={{ base: "30px", md: "42px" }} lineHeight="1.02" letterSpacing="-.05em">A jó könyvelésből nem a rendszer látszik. Hanem az, hogy minden a helyén van.</Text>
        <Flex mt={7} pt={5} borderTop="1px solid rgba(255,255,255,.24)" gap={6} wrap="wrap">
          {['feldolgozás','ellenőrzés','tájékoztatás'].map((x)=><Text key={x} fontSize="10px" color="rgba(255,255,255,.68)">{x}</Text>)}
        </Flex>
      </Box>
    </Box>
  );
}

function TaxVisual() {
  return (
    <Box minH={{ base: "430px", md: "560px" }} bg={design.colors.offWhite} borderTop="1px solid" borderBottom="1px solid" borderColor={design.colors.border} position="relative" overflow="hidden" p={{ base: 7, md: 10 }}>
      <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Adótanácsadás / döntés előtt</Text>
      <Text mt={{ base: 10, md: 14 }} fontSize={{ base: "72px", md: "112px" }} fontWeight="500" lineHeight=".78" letterSpacing="-.08em" color={design.colors.ink}>MI<br/>HA?</Text>
      <Box position="absolute" right={{ base: 7, md: 10 }} bottom={{ base: 8, md: 10 }} maxW="300px" textAlign="right">
        <Text fontSize={{ base: "18px", md: "22px" }} lineHeight="1.25" letterSpacing="-.035em" color={design.colors.graphite}>Előbb a kérdés.<br/>Aztán az adatok.<br/>Utána a döntés.</Text>
        <Text mt={5} fontSize="10px" lineHeight="1.6" color={design.colors.quiet}>Nem recept. A konkrét helyzet adózási következményeinek áttekintése.</Text>
      </Box>
      <Box position="absolute" right="18%" top="16%" w="1px" h="34%" bg={design.colors.champagne} opacity=".55" transform="rotate(24deg)" transformOrigin="top" />
    </Box>
  );
}

function PayrollVisual() {
  const days = ["01", "05", "10", "12", "20", "31"];
  return (
    <Box minH={{ base: "430px", md: "560px" }} bg={design.colors.ink} color="#fff" p={{ base: 7, md: 9 }} display="flex" flexDirection="column" justifyContent="space-between">
      <Flex justify="space-between" align="baseline" gap={4}>
        <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Havi ritmus</Text>
        <Text fontSize="10px" color="rgba(255,255,255,.35)">BÉRSZÁMFEJTÉS</Text>
      </Flex>
      <Box my={{ base: 9, md: 12 }}>
        <Grid templateColumns="repeat(6,1fr)" borderTop="1px solid rgba(255,255,255,.18)" borderBottom="1px solid rgba(255,255,255,.18)">
          {days.map((d,i)=><Box key={d} py={{ base: 5, md: 7 }} borderLeft={i?"1px solid rgba(255,255,255,.12)":"0"}><Text textAlign="center" fontSize={{ base: "18px", md: "26px" }} color="rgba(255,255,255,.72)">{d}</Text></Box>)}
        </Grid>
        <Text mt={7} maxW="500px" fontSize={{ base: "28px", md: "40px" }} lineHeight="1.05" letterSpacing="-.05em">A hónap nem egyetlen számfejtési pillanatból áll.</Text>
      </Box>
      <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(4,1fr)" }} gap={4}>
        {['változások','számfejtés','bevallás','tájékoztatás'].map((x,i)=><Box key={x} pt={3} borderTop="2px solid rgba(255,255,255,.16)"><Text fontSize="9px" color="rgba(255,255,255,.48)">{x}</Text></Box>)}
      </Grid>
    </Box>
  );
}

function ManagementVisual() {
  const questions = ["Hol tartunk?", "Mi változott?", "Mire számítsunk?", "Mi igényel döntést?"];
  return (
    <Box minH={{ base: "430px", md: "560px" }} bg="#E9E2D7" color={design.colors.ink} p={{ base: 7, md: 10 }} position="relative" overflow="hidden">
      <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Vezetői jegyzet</Text>
      <Text mt={{ base: 9, md: 12 }} maxW="620px" fontSize={{ base: "34px", md: "46px" }} lineHeight="1.04" letterSpacing="-.055em">A számokból akkor lesz vezetői kép, ha jó kérdések köré rendezzük őket.</Text>
      <Grid mt={{ base: 10, md: 14 }} templateColumns="1fr 1fr" gap={{ base: 6, md: 8 }}>
        {questions.map((q, i) => (
          <Box key={q} minH={{ base: "105px", md: "125px" }} display="flex" flexDirection="column" justifyContent="space-between" borderLeft="1px solid" borderColor={i % 2 ? design.colors.border : design.colors.champagne} pl={{ base: 4, md: 5 }}>
            <Text fontSize="9px" color={design.colors.quiet}>0{i + 1}</Text>
            <Text fontSize={{ base: "18px", md: "22px" }} lineHeight="1.15" letterSpacing="-.035em">{q}</Text>
          </Box>
        ))}
      </Grid>
      <Text position="absolute" right={-8} bottom={-28} fontSize={{ base: "110px", md: "160px" }} fontWeight="650" letterSpacing="-.1em" color="rgba(16,38,51,.035)">Q</Text>
    </Box>
  );
}

function BudapestVisual() {
  return (
    <Box minH={{ base: "430px", md: "560px" }} position="relative" overflow="hidden" bg={design.colors.ink}>
      <Box position="absolute" inset="0" backgroundImage="linear-gradient(180deg,rgba(16,38,51,.03),rgba(16,38,51,.88)), url('https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&fm=jpg&q=82&w=1800')" backgroundSize="cover" backgroundPosition="center" />
      <Box position="absolute" left={{ base: 6, md: 9 }} right={{ base: 6, md: 9 }} bottom={{ base: 7, md: 9 }} color="#fff">
        <Text fontSize="9px" color={design.colors.champagne} letterSpacing=".14em">BUDAPEST / ONLINE</Text>
        <Text mt={4} maxW="540px" fontSize={{ base: "31px", md: "42px" }} lineHeight="1.02" letterSpacing="-.05em">A könyveléshez nem kell hetente iratot vinni valahová.</Text>
        <Text mt={5} maxW="500px" fontSize="11px" lineHeight="1.65" color="rgba(255,255,255,.7)">Digitális dokumentumkezelés, online egyeztetés és követhető szakmai kapcsolattartás.</Text>
      </Box>
    </Box>
  );
}

function SwitchVisual() {
  return (
    <Box minH={{ base: "430px", md: "560px" }} bg={design.colors.offWhite} border="1px solid" borderColor={design.colors.border} p={{ base: 7, md: 9 }} display="flex" flexDirection="column" justifyContent="space-between">
      <Text fontSize="9px" letterSpacing=".14em" textTransform="uppercase" color={design.colors.champagne}>Könyvelőváltás</Text>
      <Grid templateColumns="1fr auto 1fr" gap={{ base: 4, md: 7 }} alignItems="center">
        <Box>
          <Text fontSize="10px" color={design.colors.quiet}>MOST</Text>
          <Text mt={3} fontSize={{ base: "28px", md: "38px" }} lineHeight="1.05" letterSpacing="-.05em">Meglévő könyvelési háttér</Text>
        </Box>
        <Text fontSize={{ base: "34px", md: "48px" }} color={design.colors.champagne}>→</Text>
        <Box textAlign="right">
          <Text fontSize="10px" color={design.colors.quiet}>UTÁNA</Text>
          <Text mt={3} fontSize={{ base: "28px", md: "38px" }} lineHeight="1.05" letterSpacing="-.05em">Rendezett új működés</Text>
        </Box>
      </Grid>
      <Box borderTop="1px solid" borderColor={design.colors.border} pt={5}>
        <Text fontSize="11px" lineHeight="1.65" color={design.colors.muted}>A váltás értéke nem a dokumentumok áthelyezése, hanem az, hogy közben ne vesszen el információ és tiszta legyen az indulás.</Text>
      </Box>
    </Box>
  );
}

export default function ServiceHeroVisual({ slug }) {
  if (slug === "adotanacsadas") return <TaxVisual />;
  if (slug === "berszamfejtes") return <PayrollVisual />;
  if (slug === "vezetoi-informacio") return <ManagementVisual />;
  if (slug === "konyveles-budapest") return <BudapestVisual />;
  if (slug === "konyvelovaltas") return <SwitchVisual />;
  return <AccountingVisual />;
}
