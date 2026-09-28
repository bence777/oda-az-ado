import { Text } from "@chakra-ui/react";
import design from "../../design/system";
export default function SectionEyebrow({ children, ...props }) {
  return <Text fontSize="10px" fontWeight="600" letterSpacing=".16em" textTransform="uppercase" color={design.colors.champagne} {...props}>{children}</Text>;
}
