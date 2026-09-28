import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import design from "../../design/system";

export default function NationalSection() {
  return (
    <Box py={{ base: 22, md: 30, lg: 38 }} bg={design.colors.white}>
      <Box maxW={design.sizes.container} mx="auto" px={design.spacing.pageX}>
        <Grid templateColumns={{ base: "1fr", lg: ".82fr 1.18fr" }} gap={{ base: 10, lg: 20 }} alignItems="end">
          <Box>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Online országosan</Text>
            <Heading as="h2" mt={6} maxW="700px" fontSize={{ base: "40px", md: "56px", lg: "68px" }} fontWeight="500" lineHeight=".98" letterSpacing="-.06em" color={design.colors.ink}>A könyvelési folyamat nem egy iratátadó helyhez kötődik.</Heading>
          </Box>
          <Text maxW="580px" justifySelf={{ lg: "end" }} fontSize="15px" lineHeight="1.8" color={design.colors.muted}>A dokumentumok digitálisan érkezhetnek, az egyeztetés online történhet, a szakmai rend pedig ugyanaz marad. Debrecen a személyes pont; Budapest és az ország többi része online kapcsolódhat.</Text>
        </Grid>

        <Flex mt={{ base: 12, md: 16 }} pt={{ base: 8, md: 10 }} borderTop="1px solid" borderColor={design.colors.border} align="center" justify="space-between" gap={7} direction={{ base: "column", md: "row" }}>
          {[['Debrecen','személyes + digitális'],['Budapest','online együttműködés'],['Országosan','digitális működés']].map(([place,mode],index)=><Box key={place} flex="1" w="100%" position="relative"><Text fontSize={{ base: "30px", md: "38px" }} fontWeight="500" letterSpacing="-.05em" color={index===1?design.colors.champagne:design.colors.ink}>{place}</Text><Text mt={2} fontSize="10px" color={design.colors.quiet}>{mode}</Text>{index<2?<Text display={{ base: "none", md: "block" }} position="absolute" right="-18px" top="8px" fontSize="28px" color={design.colors.border}>→</Text>:null}</Box>)}
        </Flex>
      </Box>
    </Box>
  );
}
