import { Heading } from "@chakra-ui/react";
import design from "../../design/system";
export default function SectionHeading({ children, ...props }) {
  return <Heading fontFamily={design.fonts.sans} fontWeight="500" letterSpacing="-.045em" color={design.colors.ink} {...props}>{children}</Heading>;
}
