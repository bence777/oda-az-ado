import { Box } from "@chakra-ui/react";
import design from "../../design/system";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function PageShell({ children }) {
  return (
    <Box minH="100vh" bg={design.colors.white} color={design.colors.ink} fontFamily={design.fonts.sans} overflow="hidden">
      <SiteHeader />
      <Box as="main">{children}</Box>
      <SiteFooter />
    </Box>
  );
}
