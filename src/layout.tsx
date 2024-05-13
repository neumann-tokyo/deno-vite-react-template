import { Flex, Heading, Link } from "@chakra-ui/react";
import { atom, useAtom, useSetAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomWithQuery } from "jotai-tanstack-query";
import Cookies from "js-cookie";
import { Redirect, Link as WouterLink, useRoute } from "wouter";
import { currentUserAtom, jwtTokenAtom } from "./atoms/current-user.ts";
import { Trans } from "./components/trans.tsx";
import { httpClient } from "./libs/http-client.ts";
import { Routes } from "./routes.tsx";
import { SignInPage } from "./routes/sign-in.tsx";
import type { User } from "./types.ts";

const signOutAtom = atom(null, (_get, set, _update) => {
	set(jwtTokenAtom, undefined);
	set(currentUserAtom, null);
	Cookies.remove("jwt-token");
});

const jwtTokenEffect = atomEffect((get, set) => {
	const jwtToken = get(jwtTokenAtom);

	if (jwtToken) {
		httpClient({ jwtToken })
			.get("users/me")
			.then(async (response) => {
				const data: User = await response.json();
				set(currentUserAtom, data);
			})
			.catch((err) => {
				set(signOutAtom, null);
			});
	} else {
		set(signOutAtom, null);
	}
});

export function Layout() {
	useAtom(jwtTokenEffect);
	const [jwtToken] = useAtom(jwtTokenAtom);
	const signOut = useSetAtom(signOutAtom);
	const [match, _] = useRoute("/");

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
					<Trans>Settings</Trans>
				</Link>
				<Link onClick={() => signOut(null)}>Sign Out</Link>
			</Flex>
			<Flex flex="5">
				<Routes />
			</Flex>
		</Flex>
	);
}
