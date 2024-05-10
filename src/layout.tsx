import { Flex, Heading, Link } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import Cookies from "js-cookie";
import { Redirect, Link as WouterLink, useRoute } from "wouter";
import { currentUserAtom, jwtTokenAtom } from "./atoms/current-user.ts";
import { Routes } from "./routes.tsx";
import { SignInPage } from "./routes/sign-in.tsx";

export function Layout() {
	const [jwtToken, setJwtToken] = useAtom(jwtTokenAtom);
	const setCurrentUser = useSetAtom(currentUserAtom);
	const [match, _] = useRoute("/");

	const onSignOut = () => {
		setJwtToken(null);
		setCurrentUser(null);
		Cookies.remove("jwt-token");
	};

	if (jwtToken == null) {
		if (!match) {
			return <Redirect to="/" />;
		}

		return <SignInPage />;
	}

	return (
		<Flex width="100%">
			<Flex flex="1" flexDirection="column" padding="1rem">
				<Heading as="h2" size="lg">
					menu
				</Heading>
				<Link as={WouterLink} to="/">
					Home
				</Link>
				<Link as={WouterLink} to="/about">
					About
				</Link>
				<Link as={WouterLink} to="/todos">
					TODO List
				</Link>
				<Link onClick={onSignOut}>Sign Out</Link>
			</Flex>
			<Flex flex="5">
				<Routes />
			</Flex>
		</Flex>
	);
}
