import ky from "ky";

export function httpClient({ jwtToken }: { jwtToken?: string } = {}) {
	let headers: {
		"Access-Control-Allow-Origin": string;
		"Access-Control-Allow-Methods": string;
		Authorization?: string;
	} = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,POST",
		Authorization: undefined,
	};

	if (jwtToken != null) {
		headers = {
			...headers,
			Authorization: `Bearer ${jwtToken}`,
		};
	}

	return ky.create({
		prefixUrl: import.meta.env.VITE_BACKEND_URL,
		credentials: "include",
		headers,
	});
}
