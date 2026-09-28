import { Box } from "@chakra-ui/react";
export default function Section({ children, ...props }) { return <Box as="section" {...props}>{children}</Box>; }
