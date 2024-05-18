import {
	Flex,
	Heading,
	Icon,
	IconButton,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { atomEffect } from "jotai-effect";
import { atomWithQuery } from "jotai-tanstack-query";
import { MdAddCircleOutline } from "react-icons/md";
import { Case, Default, Switch } from "react-if";
import { rolesAtom } from "../../atoms/api.ts";
import { jwtTokenAtom } from "../../atoms/current-user.ts";
import { ErrorAlert } from "../../components/error-alert.tsx";
import { Trans } from "../../components/trans.tsx";
import { httpClient } from "../../libs/http-client.ts";
import type { Role } from "../../types.ts";
import { rolePermissionsAtoms } from "./_atoms/role-permissions-atoms.ts";
import { RoleNewDrawer } from "./_components/role-new-drawer.tsx";
import { RolePermissions } from "./_components/role-permissions.tsx";

const RolesIndexEffect = atomEffect((get, set) => {
	const { data, isSuccess } = get(rolesAtom);

	if (isSuccess) {
		const roles = data as Role[];
		for (const role of roles) {
			const arr = get(rolePermissionsAtoms);
			const found = arr.find((rpa) => rpa.roleIdentifier === role.identifier);
			if (!found) {
				const newAtom = atomWithQuery((get) => ({
					queryKey: ["roles", role.identifier],
					queryFn: async () =>
						await httpClient({ jwtToken: get(jwtTokenAtom) as string })
							.get(`roles/${role.identifier}`)
							.json(),
				}));
				set(rolePermissionsAtoms, [
					...arr,
					{ roleIdentifier: role.identifier, atom: newAtom },
				]);
			}
		}
	}
});

export function RolesIndexPage() {
	useAtom(RolesIndexEffect);
	const [{ data, isPending, isError }] = useAtom(rolesAtom);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex flexDirection="column">
			<Heading as="h1">
				<Trans>Roles and Permissions</Trans>
			</Heading>
			<Switch>
				<Case condition={isPending}>
					<Spinner />
				</Case>
				<Case condition={isError}>
					<ErrorAlert title="Fail to load data" />
				</Case>
				<Default>
					<Tabs>
						<Flex alignItems="center">
							<TabList>
								{(data as Role[])?.map((role) => (
									<Tab key={role.identifier}>{role.displayName}</Tab>
								))}
							</TabList>
							<IconButton
								colorScheme="blue"
								aria-label="add role"
								size="sm"
								icon={<Icon as={MdAddCircleOutline} boxSize={6} />}
								onClick={onOpen}
							/>
						</Flex>

						<TabPanels>
							{(data as Role[])?.map((role) => (
								<TabPanel key={role.identifier}>
									<RolePermissions role={role} />
								</TabPanel>
							))}
						</TabPanels>
					</Tabs>
				</Default>
			</Switch>
			<RoleNewDrawer isOpen={isOpen} onClose={onClose} />
		</Flex>
	);
}
