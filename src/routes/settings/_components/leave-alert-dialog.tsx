import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	useDisclosure,
} from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import { atomWithMutation } from "jotai-tanstack-query";
import { useRef } from "react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { jwtTokenAtom, signOutAtom } from "../../../atoms/current-user.ts";
import { Trans } from "../../../components/trans.tsx";
import { httpClient } from "../../../libs/http-client.ts";

const leaveUserAtom = atomWithMutation((get) => ({
	mutationKey: ["leave-user"],
	mutationFn: () =>
		httpClient({
			jwtToken: get(jwtTokenAtom),
		})
			.post("users/leave")
			.json(),
}));

export function LeaveAlertDialog() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef(null);
	const [{ mutate, isPending, isSuccess, error }] = useAtom(leaveUserAtom);
	const [_, navigate] = useLocation();
	const signOut = useSetAtom(signOutAtom);

	useEffect(() => {
		if (isSuccess) {
			signOut(null);
			navigate("/");
		}
		if (error) {
			alert(error);
		}
	}, [isSuccess, signOut, navigate, error]);

	return (
		<>
			<Button colorScheme="red" onClick={onOpen}>
				<Trans>Leave the system</Trans>
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							<Trans>Leave the system</Trans>
						</AlertDialogHeader>

						<AlertDialogBody>
							<Trans>
								Are you sure? You can't undo this action afterwards.
							</Trans>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Flex gap="0.5rem">
								<Button
									colorScheme="red"
									ml={3}
									onClick={() => mutate()}
									isLoading={isPending}
								>
									<Trans>Leave</Trans>
								</Button>
								<Button ref={cancelRef} onClick={onClose}>
									<Trans>Cancel</Trans>
								</Button>
							</Flex>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
