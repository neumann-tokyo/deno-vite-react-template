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
	useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
	atomWithMutation,
	atomWithQuery,
	queryClientAtom,
} from "jotai-tanstack-query";
import { useState } from "react";
import { Case, Default, Switch, When } from "react-if";
import { rolesAtom } from "../../atoms/api.ts";
import { currentUserAtom, jwtTokenAtom } from "../../atoms/current-user.ts";
import { ErrorAlert } from "../../components/error-alert.tsx";
import { Trans } from "../../components/trans.tsx";
import { httpClient } from "../../libs/http-client.ts";
import type { Role, User } from "../../types.ts";
import { EditUserDrawer } from "./_components/edit-user-drawer.tsx";

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

const rejectUserAtom = atomWithMutation((get) => ({
	mutationKey: ["reject-user"],
	mutationFn: (data: { userId: number }) =>
		httpClient({ jwtToken: get(jwtTokenAtom) })
			.post(`user/${data.userId}/reject`)
			.json(),
	onSuccess: () => {
		const queryClient = get(queryClientAtom);
		queryClient.invalidateQueries({ queryKey: ["users"] });
	},
}));

export function UsersIndexPage() {
	const [currentUser] = useAtom(currentUserAtom);
	const [{ data: users, status: usersStatus }] = useAtom(usersAtom);
	const [{ data: roles, status: rolesStatus }] = useAtom(rolesAtom);
	const [{ mutate, status: updateStatus }] = useAtom(updateUsersRoleAtom);
	const [{ mutate: rejectUser, status: rejectUserStatus }] =
		useAtom(rejectUserAtom);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
												<Switch>
													<Case
														condition={
															!!user.roles?.find(
																(r) => r.roleIdentifier === "leaved",
															)
														}
													>
														<Trans>Leaved</Trans>
													</Case>
													<Case
														condition={
															!!user.roles?.find(
																(r) => r.roleIdentifier === "rejected",
															)
														}
													>
														<Trans>Rejected</Trans>
													</Case>
													<Default>
														{(roles as Role[])
															?.filter(
																(r) =>
																	!(
																		r.identifier === "leaved" ||
																		r.identifier === "rejected"
																	),
															)
															?.map((role) => (
																<Checkbox
																	key={role.identifier}
																	value={role.identifier}
																>
																	{role.displayName}
																</Checkbox>
															))}
													</Default>
												</Switch>
											</Flex>
										</CheckboxGroup>
									</Td>
									<Td>
										<Flex gap="0.5rem" alignItems="center">
											<Button
												type="button"
												size="sm"
												colorScheme="blue"
												onClick={() => {
													setSelectedUser(user);
													onOpen();
												}}
											>
												<Trans>Edit</Trans>
											</Button>
											<When
												condition={
													!(
														user.roles?.find(
															(r) => r.roleIdentifier === "rejected",
														) || user.id === currentUser?.id
													)
												}
											>
												<Button
													type="button"
													size="sm"
													colorScheme="red"
													onClick={() => {
														if (confirm("Are you sure?")) {
															rejectUser({ userId: user.id });
														}
													}}
												>
													<Trans>Reject</Trans>
												</Button>
											</When>
										</Flex>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Default>
			</Switch>

			<When condition={!!selectedUser}>
				<EditUserDrawer
					isOpen={isOpen}
					onClose={onClose}
					/* biome-ignore lint/style/noNonNullAssertion: off */
					user={selectedUser!}
				/>
			</When>
		</Flex>
	);
}
