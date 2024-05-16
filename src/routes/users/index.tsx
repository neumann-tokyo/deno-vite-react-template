import {
	Button,
	Checkbox,
	CheckboxGroup,
	Flex,
	Heading,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
	atomWithMutation,
	atomWithQuery,
	queryClientAtom,
} from "jotai-tanstack-query";
import { Case, Default, Switch } from "react-if";
import { rolesAtom } from "../../atoms/api.ts";
import { jwtTokenAtom } from "../../atoms/current-user.ts";
import { ErrorAlert } from "../../components/error-alert.tsx";
import { Trans } from "../../components/trans.tsx";
import { httpClient } from "../../libs/http-client.ts";
import type { Role, User } from "../../types.ts";

const usersAtom = atomWithQuery((get) => ({
	queryKey: ["users"],
	queryFn: async () =>
		await httpClient({ jwtToken: get(jwtTokenAtom) })
			.get("users")
			.json(),
}));

const updateUsersRoleAtom = atomWithMutation((get) => ({
	mutationKey: ["update-users-role"],
	mutationFn: (data: {
		userId: number;
		roles: string[];
	}) =>
		httpClient({
			jwtToken: get(jwtTokenAtom),
		})
			.post(`users/${data.userId}/update_roles`, {
				json: {
					roles: data.roles,
				},
			})
			.json(),
	onSuccess: () => {
		const queryClient = get(queryClientAtom);

		queryClient.invalidateQueries({ queryKey: ["users"] });
		queryClient.invalidateQueries({ queryKey: ["current-user"] });
	},
}));

export function UsersIndexPage() {
	const [{ data: users, status: usersStatus }] = useAtom(usersAtom);
	const [{ data: roles, status: rolesStatus }] = useAtom(rolesAtom);
	const [{ mutate, status: updateStatus }] = useAtom(updateUsersRoleAtom);

	const onChangeRoles = (userId: number) => (roles: string[]) => {
		mutate({
			userId,
			roles,
		});
	};

	return (
		<Flex flexDirection="column">
			<Heading>
				<Trans>Users Management</Trans>
			</Heading>
			<Switch>
				<Case
					condition={
						usersStatus === "pending" ||
						rolesStatus === "pending" ||
						updateStatus === "pending"
					}
				>
					<Spinner />
				</Case>
				<Case
					condition={
						usersStatus === "error" ||
						rolesStatus === "error" ||
						updateStatus === "error"
					}
				>
					<ErrorAlert title="Fail to load data" />
				</Case>
				<Default>
					<Table variant="striped" colorScheme="gray">
						<Thead>
							<Tr>
								<Th>
									<Trans>Users</Trans>
								</Th>
								<Th>
									<Trans>Roles</Trans>
								</Th>
								<Th>
									<Trans>Actions</Trans>
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{(users as User[])?.map((user) => (
								<Tr key={user.id}>
									<Td>
										<Flex flexDirection="column">
											<Text fontSize="lg" fontWeight="bold">
												{user.displayName}
											</Text>
											<Text>{user.email}</Text>
										</Flex>
									</Td>
									<Td>
										<CheckboxGroup
											value={user.roles?.map((r) => r.roleIdentifier)}
											onChange={onChangeRoles(user.id)}
										>
											<Flex gap="1rem">
												{(roles as Role[])?.map((role) => (
													<Checkbox
														key={role.identifier}
														value={role.identifier}
														isDisabled={role.identifier === "leaved"}
													>
														{role.displayName}
													</Checkbox>
												))}
											</Flex>
										</CheckboxGroup>
									</Td>
									<Td>
										<Button
											type="button"
											size="sm"
											colorScheme="red"
											onClick={() => alert("WIP")}
										>
											<Trans>Edit</Trans>
										</Button>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Default>
			</Switch>
		</Flex>
	);
}
