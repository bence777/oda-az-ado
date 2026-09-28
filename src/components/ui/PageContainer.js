import { Container } from "@chakra-ui/react";
import design from "../../design/system";
export default function PageContainer({ children, ...props }) {
  return <Container maxW={design.sizes.container} px={design.spacing.pageX} {...props}>{children}</Container>;
}
