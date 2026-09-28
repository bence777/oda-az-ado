import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";

export default function OperationsCta() {
  return (
    <Box py={{ base: 24, md: 32, lg: 38 }}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: "1.25fr .75fr" }} gap={{ base: 10, lg: 18 }} alignItems="end">
          <Heading as="h2" maxW="940px" fontSize={{ base: "44px", md: "62px", lg: "76px" }} fontWeight="500" lineHeight=".97" letterSpacing="-.062em" color={design.colors.ink}>
            Ha a könyvelés működése is átlátható, <Box as="span" color={design.colors.champagne}>kevesebb dolog marad kérdőjel.</Box>
          </Heading>
          <Box justifySelf={{ lg: "end" }} maxW="440px">
            <Text fontSize="15px" lineHeight="1.75" color={design.colors.muted}>Beszéljük át a jelenlegi folyamatot, a szükséges szolgáltatásokat és azt, milyen együttműködés lenne fenntartható a vállalkozás számára.</Text>
            <Button as="a" href="/kapcsolat#ajanlatkeres" mt={8} h="52px" px={8} borderRadius="0" bg={design.colors.ink} color="#fff" fontSize="11px" fontWeight="650" _hover={{ bg: design.colors.champagne, color: design.colors.ink }}>Ajánlatot kérek</Button>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
