import { Flex, Heading } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomWithMutation } from "jotai-tanstack-query";
import { When } from "react-if";
import { useLocation } from "wouter";
import { currentUserAtom, jwtTokenAtom } from "../../atoms/current-user.ts";
import { EditUserForm } from "../../components/edit-user-form.tsx";
import { ErrorAlert } from "../../components/error-alert.tsx";
import { httpClient } from "../../libs/http-client.ts";

const updateCurrentUserAtom = atomWithMutation((get) => ({
	mutationKey: ["update-current-user"],
	mutationFn: (data: {
		email: string;
		displayName: string;
		language: string;
		timezone: string;
		datetimeFormat: string;
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
	const [_, navigate] = useLocation();

	const onSubmit = (e: any) => {
		e.preventDefault();

		mutate({
			email: e.target.email.value,
			displayName: e.target.displayName.value,
			language: e.target.language.value,
			timezone: e.target.timezone.value,
			datetimeFormat: e.target.datetimeFormat.value,
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
			<EditUserForm
				onSubmit={onSubmit}
				user={currentUser}
				isLoading={isPending}
				onBack={() => navigate("/settings")}
			/>
		</Flex>
	);
}
