import {
	Card,
	CardBody,
	CardHeader,
	Flex,
	Heading,
	Text,
} from "@chakra-ui/react";

export function NotPermissionPage() {
	return (
		<Flex width="100%" justifyContent="center" bg="lightgray">
			<Card width="400px" margin="3rem 0">
				<CardHeader>
					<Heading as="h1" size="2xl">
						403 Forbidden
					</Heading>
				</CardHeader>
				<CardBody>
					<Text>You don't have permission to access this page.</Text>
				</CardBody>
			</Card>
		</Flex>
	);
}
