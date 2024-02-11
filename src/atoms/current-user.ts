import { atom } from "jotai";
import Cookies from "js-cookie";

export const jwtTokenAtom = atom(Cookies.get("moshimoshi-jwt-token"));

export const currentUserAtom = atom(null);
