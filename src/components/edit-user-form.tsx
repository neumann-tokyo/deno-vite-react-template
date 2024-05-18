import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormHelperText,
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
				<Box>
					<Checkbox
						onChange={(e) => setShowPassword(e.target.checked)}
						name="showPassword"
					>
						<Trans>Change Password</Trans>
					</Checkbox>
					<When condition={showPassword}>
						<FormControl>
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								placeholder="Password"
								name="password"
								minLength={8}
								maxLength={50}
								required
							/>
							<FormHelperText>
								<Trans>Password length is between 8 and 50</Trans>
							</FormHelperText>
						</FormControl>
					</When>
				</Box>
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
