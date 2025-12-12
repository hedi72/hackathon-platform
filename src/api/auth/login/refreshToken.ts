import { BASE_URL } from "../../config/apiConfig";

export async function refreshTokenRequest() {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) throw new Error("Refresh failed");

  return res.json(); // { token: "newToken" }
}