import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Flex,
	FormControl,
	FormLabel,
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

const signInPostAtom = atomWithMutation(() => ({
	mutationKey: ["sign-in"],
	mutationFn: (data: { email: string; password: string }) =>
		httpClient().post("users/sign-in", { json: data }).json(),
	onSuccess: (res) => {
		console.log(res);
	},
	onError: (res) => {
		console.log(res);
	},
}));
// const onSuccessSignInEffect = atomEffect((get, set) => {
// 	const { isSuccess, data } = get(signInPostAtom);

// 	console.log("isSuccess:", isSuccess);
// 	console.log("data:", data);

// 	// if (isSuccess) {
// 	// 	Cookies.set("jwt-token", data.token);
// 	// 	set(jwtTokenAtom, data.token);
// 	// 	set(currentUserAtom, data.user);
// 	// }
// });

export function SignInPage() {
	const [{ mutate, isPending, isError }] = useAtom(signInPostAtom);
	// useAtom(onSuccessSignInEffect);

	const onSubmit = (e: any) => {
		e.preventDefault();
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
								<When condition={isError}>
									<Text color="tomato">Failed to sign in</Text>
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
