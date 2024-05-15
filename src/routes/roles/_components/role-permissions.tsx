import {
	Box,
	Flex,
	Grid,
	GridItem,
	Heading,
	Spinner,
	Switch as SwitchUI,
	Text,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { useMemo } from "react";
import { Case, Default, Switch } from "react-if";
import { jwtTokenAtom } from "../../../atoms/current-user.ts";
import { ErrorAlert } from "../../../components/error-alert.tsx";
import { Trans } from "../../../components/trans.tsx";
import { httpClient } from "../../../libs/http-client.ts";
import type { Permission, Role } from "../../../types.ts";
import {
	type RolePermissionsAtomType,
	rolePermissionsAtoms,
} from "../_atoms/role-permissions-atoms.ts";

const permissionsAtom = atomWithQuery((get) => ({
	queryKey: ["permissions"],
	queryFn: async () =>
		await httpClient({ jwtToken: get(jwtTokenAtom) as string })
			.get("permissions")
			.json(),
}));

export function RolePermissions({ role }: { role: Role }) {
	const atoms = useAtomValue(rolePermissionsAtoms);
	const found = useMemo<RolePermissionsAtomType | undefined>(
		() => atoms.find((rpa) => rpa.roleIdentifier === role.identifier),
		[atoms, role],
	);
	const [{ data, isPending, isError }] = found
		? useAtom(found.atom)
		: ([
				{
					data: null,
					isPending: false,
					isError: true,
				},
			] as any);
	const [
		{
			data: permissionsData,
			isPending: permissionsIsPending,
			isError: permissionsIsError,
		},
	] = useAtom(permissionsAtom);
	const havingPermissionIdentifiers = useMemo<string[]>(
		() =>
			(data as any)?.permissions?.map((p: Permission) => p.identifier) || [],
		[data],
	);

	return (
		<Flex flexDirection="column">
			<Heading as="h2">{role.displayName}</Heading>
			<Flex flexDirection="column">
				<Heading as="h3">
					<Trans>Roles Settings</Trans>
				</Heading>
				<div>TODO form</div>
			</Flex>
			<Flex flexDirection="column">
				<Heading as="h3">
					<Trans>Permissions Settings</Trans>
				</Heading>
				<Switch>
					<Case condition={isPending || permissionsIsPending}>
						<Spinner />
					</Case>
					<Case condition={isError || permissionsIsError}>
						<ErrorAlert title="Fail to load data" />
					</Case>
					<Default>
						<Flex flexDirection="column" gap="1rem">
							{(permissionsData as Permission[])?.map((permission) => (
								<Grid
									key={permission.identifier}
									templateRows="repeat(2, 1fr)"
									templateColumns="1fr 4rem"
									alignItems="center"
								>
									<GridItem>
										<Text fontSize="lg">{permission.displayName}</Text>
									</GridItem>
									<GridItem justifySelf="end">
										<SwitchUI
											defaultChecked={havingPermissionIdentifiers.includes(
												permission.identifier,
											)}
											// onChange={(e) => {}}
										/>
									</GridItem>
									<GridItem colSpan={2}>{permission.description}</GridItem>
								</Grid>
							))}
						</Flex>
					</Default>
				</Switch>
			</Flex>
		</Flex>
	);
}
