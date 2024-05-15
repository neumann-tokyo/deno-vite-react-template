import { atom } from "jotai";

export type RolePermissionsAtomType = {
	roleIdentifier: string;
	atom: any;
};
export const rolePermissionsAtoms = atom<RolePermissionsAtomType[]>([]);
