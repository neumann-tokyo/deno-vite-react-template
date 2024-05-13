import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useLocation } from "wouter";
import { DatetimeFormat, FormatType } from "../components/datetime-format.tsx";
import { Trans } from "../components/trans.tsx";

export function HomePage() {
	const currentTime = useMemo(() => new Date(), []);
	const [_, navigate] = useLocation();

	return (
		<Box>
			<Heading as="h1" size="4xl">
				Home
			</Heading>
			<Flex gap="0.5rem">
				<Text fontSize="3xl">
					<Trans>Current time</Trans>:
				</Text>
				<Text fontSize="3xl">
					<DatetimeFormat formatType={FormatType.DateTime}>
						{currentTime.toISOString()}
					</DatetimeFormat>
				</Text>
			</Flex>

			<Button
				colorScheme="blue"
				type="button"
				onClick={() => navigate("/settings")}
			>
				Settings
			</Button>
		</Box>
	);
}
