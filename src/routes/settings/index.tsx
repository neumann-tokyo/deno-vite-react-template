import {
	Box,
	Button,
	Flex,
	Heading,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Tr,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useLocation } from "wouter";
import { currentUserAtom } from "../../atoms/current-user.ts";
import { Trans } from "../../components/trans.tsx";

export function SettingsIndexPage() {
	const { colorMode, toggleColorMode } = useColorMode();
	const currentUser = useAtomValue(currentUserAtom);
	const [_, navigate] = useLocation();

	return (
		<Flex flexDirection="column" gap="1rem">
			<Heading as="h1" size="4xl">
				<Trans>Settings</Trans>
			</Heading>
			<Box>
				<Button colorScheme="blue" onClick={toggleColorMode}>
					<Trans>{`Toggle ${colorMode === "light" ? "Dark" : "Light"}`}</Trans>
				</Button>
			</Box>
			<TableContainer>
				<Table variant="striped" colorScheme="gray">
					<Tbody>
						<Tr>
							<Th>Email</Th>
							<Td>{currentUser?.email}</Td>
						</Tr>
						<Tr>
							<Th>
								<Trans>Display Name</Trans>
							</Th>
							<Td>{currentUser?.displayName}</Td>
						</Tr>
						<Tr>
							<Th>
								<Trans>Language</Trans>
							</Th>
							<Td>{currentUser?.language}</Td>
						</Tr>
						<Tr>
							<Th>
								<Trans>Timezone</Trans>
							</Th>
							<Td>{currentUser?.timezone}</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
			<Box>
				<Button
					colorScheme="blue"
					onClick={() => navigate("/settings/edit")}
					type="button"
				>
					<Trans>Edit Profile</Trans>
				</Button>
			</Box>
		</Flex>
	);
}
