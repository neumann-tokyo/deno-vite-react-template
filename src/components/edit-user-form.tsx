import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { When } from "react-if";
import type { User } from "../types.ts";
import { DatetimeFormatSelect } from "./datetime-format-select.tsx";
import { datetimeFormats } from "./datetime-format.tsx";
import { LanguageSelect } from "./language-select.tsx";
import { TimezoneSelect } from "./timezone-select.tsx";
import { Trans } from "./trans.tsx";

export function EditUserForm({
	onSubmit,
	user,
	onBack,
	isLoading,
}: {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	user: User | null;
	onBack: () => void;
	isLoading: boolean;
}) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form onSubmit={onSubmit}>
			<Flex flexDirection="column" gap="1rem">
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input
						placeholder="Email"
						name="email"
						defaultValue={user?.email}
						minLength={5}
						required
					/>
				</FormControl>
				<FormControl>
					<Checkbox onChange={(e) => setShowPassword(e.target.checked)}>
						<Trans>Change Password</Trans>
					</Checkbox>
					<When condition={showPassword}>
						<>
							<FormLabel>Password</FormLabel>
							<Input
								placeholder="Email"
								name="email"
								defaultValue={user?.email}
								minLength={5}
								required
							/>
						</>
					</When>
				</FormControl>
				<FormControl>
					<FormLabel>Display Name</FormLabel>
					<Input
						placeholder="displayName"
						name="displayName"
						defaultValue={user?.displayName}
						maxLength={20}
						minLength={2}
						required
					/>
				</FormControl>
				<FormControl>
					<FormLabel>
						<Trans>Language</Trans>
					</FormLabel>
					<LanguageSelect
						name="language"
						defaultValue={user?.language ?? "en_US"}
						required
					/>
				</FormControl>
				<FormControl>
					<FormLabel>
						<Trans>Timezone</Trans>
					</FormLabel>
					<TimezoneSelect
						name="timezone"
						defaultValue={user?.timezone ?? "Asia/Tokyo"}
						required
					/>
				</FormControl>
				<FormControl>
					<FormLabel>
						<Trans>Date Format</Trans>
					</FormLabel>
					<DatetimeFormatSelect
						name="datetimeFormat"
						defaultValue={user?.datetimeFormat ?? datetimeFormats[0]}
						required
					/>
				</FormControl>
				<Flex gap="0.5rem">
					<Button colorScheme="blue" type="submit" isLoading={isLoading}>
						Save
					</Button>
					<Button type="button" onClick={onBack}>
						<Trans>Back</Trans>
					</Button>
				</Flex>
			</Flex>
		</form>
	);
}
