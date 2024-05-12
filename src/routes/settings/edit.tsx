import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomWithMutation } from "jotai-tanstack-query";
import { When } from "react-if";
import { currentUserAtom, jwtTokenAtom } from "../../atoms/current-user.ts";
import { ErrorAlert } from "../../components/error-alert.tsx";
import { httpClient } from "../../libs/http-client.ts";
import { LanguageSelect } from "./_components/language-select.tsx";
import { TimezoneSelect } from "./_components/timezone-select.tsx";

// import { useLocation } from "wouter";

const updateCurrentUserAtom = atomWithMutation((get) => ({
	mutationKey: ["update-current-user"],
	mutationFn: (data: {
		email: string;
		displayName: string;
		language: string;
		timezone: string;
	}) => {
		return httpClient({
			jwtToken: get(jwtTokenAtom),
		})
			.post("users/me/update", { json: data })
			.json();
	},
}));
const settingsEditEffect = atomEffect((get, set) => {
	const { isIdle, isPending, isSuccess, data } = get(updateCurrentUserAtom);

	if (isIdle || isPending) {
		return;
	}

	if (isSuccess && data) {
		const updatedUserData = (data as any)?.user;
		const user = {
			...get(currentUserAtom),
			...updatedUserData,
		};
		set(currentUserAtom, user);
	}
});

export function SettingsEditPage() {
	useAtom(settingsEditEffect);
	const [{ mutate, isPending, isError }] = useAtom(updateCurrentUserAtom);
	const [currentUser] = useAtom(currentUserAtom);

	const onSubmit = (e: any) => {
		e.preventDefault();

		mutate({
			email: e.target.email.value,
			displayName: e.target.displayName.value,
			language: e.target.language.value,
			timezone: e.target.timezone.value,
		});
	};

	return (
		<Flex flexDirection="column" gap="1rem">
			<Heading as="h1" size="4xl">
				Settings
			</Heading>
			<When condition={isError}>
				<ErrorAlert title="Fail to save" />
			</When>
			<form onSubmit={onSubmit}>
				<Flex flexDirection="column" gap="1rem">
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							placeholder="Email"
							name="email"
							defaultValue={currentUser?.email}
							minLength={5}
							required
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Display Name</FormLabel>
						<Input
							placeholder="displayName"
							name="displayName"
							defaultValue={currentUser?.displayName}
							maxLength={20}
							minLength={2}
							required
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Language</FormLabel>
						<LanguageSelect
							name="language"
							defaultValue={currentUser?.language ?? "en_US"}
							required
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Timezone</FormLabel>
						<TimezoneSelect
							name="timezone"
							defaultValue={currentUser?.timezone ?? "Asia/Tokyo"}
							required
						/>
					</FormControl>
					<Box>
						<Button colorScheme="blue" type="submit" isLoading={isPending}>
							Save
						</Button>
					</Box>
				</Flex>
			</form>
		</Flex>
	);
}
