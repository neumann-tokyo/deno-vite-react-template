import { Box, Flex } from "@chakra-ui/react";
import { Routes } from "./routes.tsx";

export function Layout() {
  return (
    <Flex width="100%">
      <Flex flex="1">
        <Box>menu</Box>
      </Flex>
      <Flex flex="5">
        <Routes />
      </Flex>
    </Flex>
  );
}
