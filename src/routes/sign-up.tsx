import {
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";
import { useEffect } from "react";
import { Else, If, Then, When } from "react-if";
import { useLocation } from "wouter";
import { useParams } from "wouter";
import { DatetimeFormatSelect } from "../components/datetime-format-select.tsx";
import { datetimeFormats } from "../components/datetime-format.tsx";
import { ErrorAlert } from "../components/error-alert.tsx";
import { LanguageSelect } from "../components/language-select.tsx";
import { TimezoneSelect } from "../components/timezone-select.tsx";
import { Trans } from "../components/trans.tsx";
import { httpClient } from "../libs/http-client.ts";

const verifyTokenAtom = atomWithMutation((_get) => ({
	mutationKey: ["verify-invitation-token"],
	mutationFn: async (data: { identifier?: string }) =>
		await httpClient().post(`invitations/check/${data.identifier}`).json(),
}));
const signUpAtom = atomWithMutation((_get) => ({
	mutationKey: ["sign-up"],
	mutationFn: async (data: {
		invitationIdentifier: string;
		email: string;
		password: string;
		displayName: string;
		timezone: string;
		language: string;
		datetimeFormat: string;
	}) => await httpClient().post("users/sign_up", { json: data }).json(),
}));

export function SignUpPage() {
	const params = useParams();
	const [{ mutate, data, isPending, isError }] = useAtom(verifyTokenAtom);
	const [
		{
			mutate: signUpMutate,
			isPending: signUpIsPending,
			isError: signUpIsError,
			isSuccess: signUpIsSuccess,
		},
	] = useAtom(signUpAtom);
	const [_, navigate] = useLocation();

	const onSubmit = (e: any) => {
		e.preventDefault();

		signUpMutate({
			invitationIdentifier: params.identifier || "",
			email: e.target.email.value,
			password: e.target.password.value,
			displayName: e.target.displayName.value,
			timezone: e.target.timezone.value,
			language: e.target.language.value,
			datetimeFormat: e.target.datetimeFormat.value,
		});
	};

	useEffect(() => {
		mutate({ identifier: params.identifier });
	}, [mutate, params]);

	useEffect(() => {
		if (signUpIsSuccess) {
			navigate("/");
		}
	}, [signUpIsSuccess, navigate]);

	if (isPending) {
		return <Spinner />;
	}

	if (isError) {
		return <div>Error</div>;
	}

	return (
		<If condition={(data as { success: boolean })?.success}>
			<Then>
				<>
					<Heading as="h1" size="4xl">
						Sign Up
					</Heading>
					<When condition={signUpIsError}>
						<ErrorAlert title="Fail to sign up" />
					</When>
					<form onSubmit={onSubmit}>
						<Flex flexDirection="column" gap="1rem" width="300px">
							<FormControl>
								<FormLabel>Email</FormLabel>
								<Input
									type="email"
									name="email"
									placeholder="Email"
									minLength={3}
									required
								/>
							</FormControl>
							<FormControl>
								<FormLabel>Password</FormLabel>
								<Input
									type="password"
									name="password"
									placeholder="Password"
									minLength={8}
									maxLength={50}
									required
								/>
								<FormHelperText>
									<Trans>Password length is between 8 and 50</Trans>
								</FormHelperText>
							</FormControl>
							<FormControl>
								<FormLabel>
									<Trans>Display Name</Trans>
								</FormLabel>
								<Input
									type="text"
									name="displayName"
									placeholder="Display Name"
									minLength={1}
									required
								/>
							</FormControl>
							<FormControl>
								<FormLabel>
									<Trans>Language</Trans>
								</FormLabel>
								<LanguageSelect
									name="language"
									defaultValue={"en_US"}
									required
								/>
							</FormControl>
							<FormControl>
								<FormLabel>
									<Trans>Timezone</Trans>
								</FormLabel>
								<TimezoneSelect
									name="timezone"
									defaultValue={"Asia/Tokyo"}
									required
								/>
							</FormControl>
							<FormControl>
								<FormLabel>
									<Trans>Date Format</Trans>
								</FormLabel>
								<DatetimeFormatSelect
									name="datetimeFormat"
									defaultValue={datetimeFormats[0]}
									required
								/>
							</FormControl>
							<Box>
								<Button
									type="submit"
									isLoading={signUpIsPending}
									colorScheme="blue"
								>
									<Trans>Submit</Trans>
								</Button>
							</Box>
						</Flex>
					</form>
				</>
			</Then>
			<Else>
				<>
					<Heading as="h1" size="4xl">
						Sign Up
					</Heading>
					<Text fontSize="2xl">
						<Trans>Invalid invitation token</Trans>
					</Text>
					<Button onClick={() => navigate("/")}>Login</Button>
				</>
			</Else>
		</If>
	);
}
