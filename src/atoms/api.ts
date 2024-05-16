import { atomWithQuery } from "jotai-tanstack-query";
import { httpClient } from "../libs/http-client.ts";
import { jwtTokenAtom } from "./current-user.ts";

export const rolesAtom = atomWithQuery((get) => ({
	queryKey: ["roles"],
	queryFn: async () =>
		await httpClient({ jwtToken: get(jwtTokenAtom) as string })
			.get("roles")
			.json(),
}));
