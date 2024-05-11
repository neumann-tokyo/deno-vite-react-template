import { Flex, Heading, Link } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomWithQuery } from "jotai-tanstack-query";
import Cookies from "js-cookie";
import { Redirect, Link as WouterLink, useRoute } from "wouter";
import { currentUserAtom, jwtTokenAtom } from "./atoms/current-user.ts";
import { httpClient } from "./libs/http-client.ts";
import { Routes } from "./routes.tsx";
import { SignInPage } from "./routes/sign-in.tsx";

const fetchCurrentUserAtom = atomWithQuery((get) => ({
	queryKey: ["current-user"],
	queryFn: async () => {
		const jwtToken = get(jwtTokenAtom);
		const response = await httpClient({ jwtToken }).get("users/me");
		return response.json();
	},
}));
const jwtTokenEffect = atomEffect((get, set) => {
	const jwtToken = get(jwtTokenAtom);

	if (jwtToken) {
		const { data }: { data: any } = get(fetchCurrentUserAtom);
		if (data) {
			set(currentUserAtom, data);
		}
	}
});

export function Layout() {
	useAtom(jwtTokenEffect);
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
				<Link as={WouterLink} to="/todos">
					TODO List
				</Link>
				<Link as={WouterLink} to="/settings">
					Settings
				</Link>
				<Link onClick={onSignOut}>Sign Out</Link>
			</Flex>
			<Flex flex="5">
				<Routes />
			</Flex>
		</Flex>
	);
}
