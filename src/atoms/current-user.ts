import { atom } from "jotai";
import Cookies from "js-cookie";

export const jwtTokenAtom = atom(Cookies.get("jwt-token"));

export const currentUserAtom = atom(null);
