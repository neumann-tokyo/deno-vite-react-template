import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Flex,
	FormControl,
	Heading,
	Input,
	Text,
} from "@chakra-ui/react";
import { atom, useAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomWithMutation } from "jotai-tanstack-query";
import Cookies from "js-cookie";
import { When } from "react-if";
import { currentUserAtom, jwtTokenAtom } from "../atoms/current-user.ts";
import { httpClient } from "../libs/http-client.ts";

const signInErrorAtom = atom<boolean | null>(null);
const signInPostAtom = atomWithMutation(() => ({
	mutationKey: ["sign-in"],
	mutationFn: (data: { email: string; password: string }) => {
		return httpClient().post("users/sign_in", { json: data }).json();
	},
}));
const signInEffect = atomEffect((get, set) => {
	const { isPending, data, error } = get(signInPostAtom);
	const signInError = get(signInErrorAtom);

	if (signInError === null || isPending) {
		return;
	}

	const token = (data as any)?.token;
	if (!error && token) {
		Cookies.set("jwt-token", token);
		set(jwtTokenAtom, token);
	} else {
		console.error(error);
		set(signInErrorAtom, true);
	}
});

export function SignInPage() {
	useAtom(signInEffect);
	const [{ mutate, isPending }] = useAtom(signInPostAtom);
	const [signInError, setSignInError] = useAtom(signInErrorAtom);

	const onSubmit = (e: any) => {
		e.preventDefault();
		setSignInError(false);
		mutate({
			email: e.target.email?.value,
			password: e.target.password?.value,
		});
	};

	return (
		<>
			<Heading as="h1" size="2xl">
				Deno React Template
			</Heading>
			<Card variant="outline" width="100%" maxWidth="400px">
				<CardHeader>
					<Heading as="h2" size="xl">
						Sign In
					</Heading>
				</CardHeader>

				<CardBody>
					<form onSubmit={onSubmit}>
						<Flex flexDirection="column" gap="1rem">
							<FormControl>
								<FormControl>Email</FormControl>
								<Input
									type="email"
									name="email"
									placeholder="Email"
									required={true}
								/>
							</FormControl>
							<FormControl>
								<FormControl>Password</FormControl>
								<Input
									type="password"
									name="password"
									placeholder="Password"
									required={true}
								/>
							</FormControl>
							<When condition={signInError === true}>
								<Text color="tomato">Invalid Email or Password</Text>
							</When>
							<Button type="submit" colorScheme="blue" isLoading={isPending}>
								Sign In
							</Button>
						</Flex>
					</form>
				</CardBody>
			</Card>
		</>
	);
}
