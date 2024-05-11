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
// import { useLocation } from "wouter";
import { currentUserAtom } from "../../atoms/current-user.ts";
import { LanguageSelect } from "./_components/language-select.tsx";
import { TimezoneSelect } from "./_components/timezone-select.tsx";

export function SettingsEditPage() {
	const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

	return (
		<Flex flexDirection="column" gap="1rem">
			<Heading as="h1" size="4xl">
				Settings
			</Heading>
			<form>
				<Flex flexDirection="column" gap="1rem">
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input
							placeholder="Email"
							name="email"
							defaultValue={currentUser?.email}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Display Name</FormLabel>
						<Input
							placeholder="displayName"
							name="displayName"
							defaultValue={currentUser?.displayName}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Language</FormLabel>
						<LanguageSelect
							name="language"
							defaultValue={currentUser?.language ?? "en_US"}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Timezone</FormLabel>
						<TimezoneSelect
							name="timezone"
							defaultValue={currentUser?.timezone ?? "Asia/Tokyo"}
						/>
					</FormControl>
					<Box>
						<Button colorScheme="blue" type="submit">
							Save
						</Button>
					</Box>
				</Flex>
			</form>
		</Flex>
	);
}
