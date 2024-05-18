import { Flex, Heading, Link } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomWithQuery } from "jotai-tanstack-query";
import { Redirect, Link as WouterLink, useLocation } from "wouter";
import {
	currentUserAtom,
	jwtTokenAtom,
	signOutAtom,
} from "./atoms/current-user.ts";
import { Can } from "./components/can.tsx";
import { Trans } from "./components/trans.tsx";
import { httpClient } from "./libs/http-client.ts";
import { Routes } from "./routes.tsx";
import type { User } from "./types.ts";

const fetchCurrentUserAtom = atomWithQuery((get) => ({
	queryKey: ["current-user"],
	queryFn: async () =>
		await httpClient({ jwtToken: get(jwtTokenAtom) as string })
			.get("users/me")
			.json(),
}));

const jwtTokenEffect = atomEffect((get, set) => {
	const jwtToken = get(jwtTokenAtom);

	if (jwtToken) {
		const { data, isSuccess } = get(fetchCurrentUserAtom);
		if (isSuccess) {
			set(currentUserAtom, data as User);
		}
	} else {
		set(currentUserAtom, null);
	}
});

const unauthenticatedPaths = ["^/$", "^/sign_up/.*$"];

export function Layout() {
	useAtom(jwtTokenEffect);
	const [jwtToken] = useAtom(jwtTokenAtom);
	const signOut = useSetAtom(signOutAtom);
	const [location] = useLocation();

	if (jwtToken == null) {
		const match = unauthenticatedPaths.find((path) =>
			new RegExp(path).test(location),
		);
		if (match) {
			return (
				<Flex width="100%" flexDirection="column" alignItems="center">
					<Flex
						width="100%"
						maxWidth="1300px"
						flexDirection="column"
						gap="1rem"
					>
						<Routes />
					</Flex>
				</Flex>
			);
		}

		return <Redirect to="/" />;
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
				<Can permissionIdentifier="todos">
					<Link as={WouterLink} to="/todos">
						TODO List
					</Link>
				</Can>
				<Link as={WouterLink} to="/settings">
					<Trans>Settings</Trans>
				</Link>
				<Can permissionIdentifier="users_management">
					<Link as={WouterLink} to="/users">
						<Trans>Users Management</Trans>
					</Link>
				</Can>
				<Can permissionIdentifier="roles">
					<Link as={WouterLink} to="/roles">
						<Trans>Roles</Trans>
					</Link>
				</Can>
				<Link onClick={() => signOut(null)}>Sign Out</Link>
			</Flex>
			<Flex flex="5">
				<Routes />
			</Flex>
		</Flex>
	);
}
