import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/react";
import { Trans } from "../../../components/trans.tsx";
import { RoleForm } from "./role-form.tsx";

export function RoleNewDrawer({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	return (
		<Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>
					<Trans>Add Role</Trans>
				</DrawerHeader>

				<DrawerBody>
					<RoleForm afterSubmit={onClose} />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}
