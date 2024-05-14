import { useAtomValue } from "jotai";
import type { ReactNode } from "react";
import { When } from "react-if";
import { currentUserAtom } from "../atoms/current-user.ts";

export function usePermission(permissionIdentifier: string) {
	const currentUser = useAtomValue(currentUserAtom);
	return currentUser?.permissions?.includes(permissionIdentifier);
}

export function Can({
	permissionIdentifier,
	children,
}: { permissionIdentifier: string; children: ReactNode }) {
	const currentUser = useAtomValue(currentUserAtom);
	return (
		<When condition={currentUser?.permissions?.includes(permissionIdentifier)}>
			{children}
		</When>
	);
}
