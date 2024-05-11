import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

export function SettingsIndexPage() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex flexDirection="column">
			<Heading as="h1" size="4xl">
				Settings
			</Heading>
			<Box>
				<Button colorScheme="blue" onClick={toggleColorMode}>
					Toggle {colorMode === "light" ? "Dark" : "Light"}
				</Button>
			</Box>
		</Flex>
	);
}
