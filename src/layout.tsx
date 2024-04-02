import { Box, Flex } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { Redirect, useRoute } from "wouter";
import { jwtTokenAtom } from "./atoms/current-user.ts";
import { Routes } from "./routes.tsx";
import { SignInPage } from "./routes/sign-in.tsx";

export function Layout() {
	const jwtToken = useAtomValue(jwtTokenAtom);
	const [match, _] = useRoute("/");

	if (jwtToken == null) {
		if (!match) {
			return <Redirect to="/" />;
		}

		return <SignInPage />;
	}

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
