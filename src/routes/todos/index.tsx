import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useLocation } from "wouter";

export function TodosIndexPage() {
	const [_location, navigate] = useLocation();

	return (
		<Flex flexDirection="column" flex="1">
			<Heading as="h1" size="4xl">
				Todo Index
			</Heading>
			<Box>
				<Button colorScheme="blue" onClick={() => navigate("/todos/new")}>
					New
				</Button>
			</Box>
			<Box>Todo List</Box>
		</Flex>
	);
}
