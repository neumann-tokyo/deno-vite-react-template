import * as qs from "qs";

function baseHeaders(): Headers {
  const headers: HeadersInit = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET,POST");
  headers.set("Content-type", "application/json; charset=UTF-8");
  return headers;
}

export async function httpPost(
  { url, body, jwtToken }: {
    url: string;
    body: object;
    jwtToken: string | undefined;
  },
) {
  const headers = baseHeaders();

  if (jwtToken) {
    headers.set("Authorization", `Bearer ${jwtToken}`);
  }

  return await fetch(`${import.meta.env.VITE_BACKEND_URL}${url}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

export async function httpGet(
  { url, searchParams, jwtToken }: {
    url: string;
    searchParams: object | undefined;
    jwtToken: string | undefined;
  },
) {
  let path: string = url;

  if (searchParams) {
    const searchParamsString = qs.stringify(searchParams);
    path = `${path}?${searchParamsString}`;
  }

  const headers = baseHeaders();

  if (jwtToken) {
    headers.set("Authorization", `Bearer ${jwtToken}`);
  }

  return await fetch(`${import.meta.env.VITE_BACKEND_URL}${path}`, {
    method: "GET",
    headers,
  });
}
