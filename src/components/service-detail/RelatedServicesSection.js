import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import PageContainer from "../ui/PageContainer";
import Section from "../ui/Section";
import design from "../../design/system";
import { serviceDetails, serviceOrder } from "../../data/serviceDetails";

export default function RelatedServicesSection({ currentSlug }) {
  const related = serviceOrder.filter((slug) => slug !== currentSlug).slice(0,3).map((slug) => serviceDetails[slug]);
  return (
    <Section py={{ base: 16, md: 20, lg: 24 }} bg={design.colors.offWhite}>
      <PageContainer>
        <Flex justify="space-between" gap={8} align={{ base: "flex-start", md: "end" }} direction={{ base: "column", md: "row" }}>
          <Box>
            <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne}>Kapcsolódó területek</Text>
            <Heading as="h2" mt={4} maxW="580px" fontSize={{ base: "32px", md: "42px" }} fontWeight="500" lineHeight="1.04" letterSpacing="-.05em" color={design.colors.ink}>A háttér ritkán egyetlen szolgáltatásból áll.</Heading>
          </Box>
          <Flex gapX={{ base: 7, md: 10 }} gapY={4} wrap="wrap">
            {related.map((item)=><Text key={item.slug} as="a" href={`/${item.slug}`} pb="4px" borderBottom="1px solid" borderColor={design.colors.champagne} fontSize={{ base: "15px", md: "17px" }} fontWeight="600" letterSpacing="-.02em" color={design.colors.ink}>{item.name}</Text>)}
          </Flex>
        </Flex>
      </PageContainer>
    </Section>
  );
}
