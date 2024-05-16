import { atom } from "jotai";
import Cookies from "js-cookie";
import type { User } from "../types.ts";

export const jwtTokenAtom = atom<string | undefined>(Cookies.get("jwt-token"));

export const currentUserAtom = atom<User | null>(null);

export const signOutAtom = atom(null, (_get, set, _update) => {
	set(jwtTokenAtom, undefined);
	set(currentUserAtom, null);
	Cookies.remove("jwt-token");
});
