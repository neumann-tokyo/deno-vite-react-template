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
import { useAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { When } from "react-if";
import { currentUserAtom, jwtTokenAtom } from "../atoms/current-user.ts";
import { httpClient } from "../libs/http-client.ts";

const signInPostAtom = atomWithMutation(() => ({
	mutationKey: ["sign-in"],
	mutationFn: (data: { email: string; password: string }) => {
		return httpClient().post("users/sign-in", { json: data }).json();
	},
}));

export function SignInPage() {
	const [{ mutate, isPending, error, data }] = useAtom(signInPostAtom);
	const [signInError, setSignInError] = useState<boolean | null>(null);
	const [_, setJwtToken] = useAtom(jwtTokenAtom);
	const [__, setCurrentUser] = useAtom(currentUserAtom);

	useEffect(() => {
		if (signInError === null) return;

		const {
			token,
			user,
		}: {
			token: string;
			user: any;
		} = data as any;

		if (!isPending && !error && token) {
			Cookies.set("jwt-token", token);
			setJwtToken(token);
			setCurrentUser(user);
		} else {
			console.error(error);
			setSignInError(true);
		}
	}, [isPending, data, error, signInError, setJwtToken, setCurrentUser]);

	const onSubmit = (e: any) => {
		e.preventDefault();
		setSignInError(false);
		mutate({
			email: e.target.email?.value,
			password: e.target.password?.value,
		});
	};

	return (
		<Flex width="100%" flexDirection="column" alignItems="center">
			<Flex width="100%" maxWidth="1300px" flexDirection="column" gap="1rem">
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
			</Flex>
		</Flex>
	);
}
