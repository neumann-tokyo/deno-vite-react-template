import { Box, Flex } from "@chakra-ui/react";
import { Routes } from "./routes.tsx";
import { Redirect, useRoute } from "wouter";
import { jwtTokenAtom } from "./atoms/current-user.ts";
import { useAtomValue } from "jotai";
import { SignInPage } from "./routes/sign-in.tsx";

export function Layout() {
  const jwtToken = useAtomValue(jwtTokenAtom);
  const [match, _] = useRoute("/");

  if (jwtToken == null) {
    if (!match) {
      return <Redirect to="/" />;
    } else {
      return <SignInPage />;
    }
  } else {
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
}
