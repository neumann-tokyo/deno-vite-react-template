import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Input,
} from "@chakra-ui/react";
import { Trans } from "../../../components/trans.tsx";
import { RoleForm } from "./role-form.tsx";

export function RoleNewDrawer({
	isOpen,
	onOpen,
	onClose,
}: {
	isOpen: boolean;
	onOpen: () => void;
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
