import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { useMemo } from "react";
import { When } from "react-if";
import type { Invitation } from "../types.ts";
import { SuccessAlert } from "./success-alert.tsx";
import { Trans } from "./trans.tsx";

export function InvitationLinkCopyButton({
	invitation,
}: {
	invitation: Invitation;
}) {
	const [copiedText, copyToClipboard] = useCopyToClipboard();
	const invitationLink = useMemo(() => {
		const baseUrl = window.location.origin;
		return `${baseUrl}/sign_up/${invitation.identifier}`;
	}, [invitation.identifier]);
	const hasCopiedText = useMemo(() => {
		return copiedText != null && copiedText !== "";
	}, [copiedText]);

	return (
		<Box>
			<When condition={hasCopiedText}>
				<SuccessAlert
					title="Copied!"
					showSeconds={2}
					afterAction={() => copyToClipboard("")}
				/>
			</When>
			<Flex alignItems="center">
				<Input type="text" isReadOnly={true} value={invitationLink} />
				<Button
					type="button"
					colorScheme="blue"
					size="sm"
					onClick={() => copyToClipboard(invitationLink)}
				>
					<Trans>Copy</Trans>
				</Button>
			</Flex>
		</Box>
	);
}
