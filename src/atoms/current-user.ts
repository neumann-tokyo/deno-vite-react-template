import { atom } from "jotai";
import Cookies from "js-cookie";
import type { User } from "../types.ts";

export const jwtTokenAtom = atom(Cookies.get("jwt-token"));

export const currentUserAtom = atom<User | null>(null);
