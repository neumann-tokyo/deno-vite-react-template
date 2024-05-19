import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import {
	Checkbox,
	Input,
	Spinner,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAtom, useAtomValue } from "jotai";
import {
	atomWithMutation,
	atomWithQuery,
	queryClientAtom,
} from "jotai-tanstack-query";
import { useMemo, useState } from "react";
import { Case, Default, Else, If, Switch, Then, When } from "react-if";
import { useLocation } from "wouter";
import { jwtTokenAtom } from "../atoms/current-user.ts";
import { Can } from "../components/can.tsx";
import { DatetimeFormat, FormatType } from "../components/datetime-format.tsx";
import { ErrorAlert } from "../components/error-alert.tsx";
import { InvitationLinkCopyButton } from "../components/invitation-link-copy-button.tsx";
import { Trans } from "../components/trans.tsx";
import { useAdjustTimezone } from "../libs/adjust-timezone.ts";
import { httpClient } from "../libs/http-client.ts";
import type { Invitation } from "../types.ts";

const invitationsAtom = atomWithQuery((get) => ({
	queryKey: ["invitations"],
	queryFn: async () =>
		await httpClient({ jwtToken: get(jwtTokenAtom) })
			.get("invitations")
			.json(),
}));
const createInvitationAtom = atomWithMutation((get) => ({
	mutationKey: ["create-invitation"],
	mutationFn: (data: { expiredAt?: string }) =>
		httpClient({ jwtToken: get(jwtTokenAtom) })
			.post("invitations", { json: data })
			.json(),
	onSuccess: () => {
		const queryClient = get(queryClientAtom);

		queryClient.invalidateQueries({ queryKey: ["invitations"] });
	},
}));

export function HomePage() {
	const [parent] = useAutoAnimate();
	const jwtToken = useAtomValue(jwtTokenAtom);
	const queryClient = useAtomValue(queryClientAtom);
	const currentTime = useMemo(() => new Date(), []);
	const [_, navigate] = useLocation();
	const [{ data, isPending, isError }] = useAtom(invitationsAtom);
	const [showExpiredAt, setShowExpiredAt] = useState(false);
	const [{ mutate, isPending: isCreateInvitationPending }] =
		useAtom(createInvitationAtom);
	const adjustTimezone = useAdjustTimezone();

	const onSubmit = (e: any) => {
		e.preventDefault();

		const expiredAt = e.target.expiredAt?.value;
		mutate({ expiredAt: expiredAt ? adjustTimezone(expiredAt) : undefined });
	};

	const onDelete = async (invitation: Invitation) => {
		const res = await httpClient({ jwtToken }).post(
			`invitations/${invitation.identifier}/delete`,
		);
		if (res.ok) {
			queryClient.invalidateQueries({ queryKey: ["invitations"] });
		} else {
			alert("Fail to remove the invitation link");
		}
	};

	return (
		<Box>
			<Heading as="h1" size="4xl">
				Home
			</Heading>
			<Flex gap="0.5rem">
				<Text fontSize="3xl">
					<Trans>Current time</Trans>:
				</Text>
				<Text fontSize="3xl">
					<DatetimeFormat formatType={FormatType.DateTime}>
						{currentTime.toISOString()}
					</DatetimeFormat>
				</Text>
			</Flex>

			<Button
				colorScheme="blue"
				type="button"
				onClick={() => navigate("/settings")}
			>
				Settings
			</Button>

			<Can permissionIdentifier="invitations">
				<Switch>
					<Case condition={isPending}>
						<Spinner />
					</Case>
					<Case condition={isError}>
						<ErrorAlert title="Fail to load invitations" />
					</Case>
					<Default>
						<Heading as="h2" size="2xl">
							<Trans>Invite new user</Trans>
						</Heading>

						<form onSubmit={onSubmit}>
							<Flex width="100%" alignItems="center">
								<Text flex="1">
									<Trans>Generate a new invitation link</Trans>
								</Text>
								<Flex flexDirection="column" width="250px">
									<Checkbox
										onChange={(e) => setShowExpiredAt(e.target.checked)}
									>
										<Trans>Set an expire time</Trans>
									</Checkbox>
									<When condition={showExpiredAt}>
										<Input type="datetime-local" name="expiredAt" required />
									</When>
								</Flex>
								<Button
									type="submit"
									colorScheme="blue"
									size="sm"
									isLoading={isCreateInvitationPending}
								>
									<Trans>Generate</Trans>
								</Button>
							</Flex>
						</form>

						<TableContainer>
							<Table variant="striped" colorScheme="gray">
								<Thead>
									<Tr>
										<Th width="40%">URL</Th>
										<Th width="40%">
											<Trans>Expired Time</Trans>
										</Th>
										<Th width="20%">
											<Trans>Actions</Trans>
										</Th>
									</Tr>
								</Thead>
								<Tbody ref={parent}>
									{(data as Invitation[])?.map((invitation) => (
										<Tr key={invitation.identifier}>
											<Td>
												<InvitationLinkCopyButton invitation={invitation} />
											</Td>
											<Td>
												<If condition={invitation.expiredAt}>
													<Then>
														<DatetimeFormat formatType={FormatType.DateTime}>
															{invitation.expiredAt}
														</DatetimeFormat>
													</Then>
													<Else>
														<Trans>None</Trans>
													</Else>
												</If>
											</Td>
											<Td>
												<Button
													colorScheme="red"
													size="sm"
													onClick={() => onDelete(invitation)}
												>
													<Trans>Delete</Trans>
												</Button>
											</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</TableContainer>
					</Default>
				</Switch>
			</Can>
		</Box>
	);
}
