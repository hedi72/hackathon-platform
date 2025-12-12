import { BASE_URL } from "@/src/api/config/apiConfig";
import { checkAndRefreshToken } from "../checkAndRefreshToken";
export const logout = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
};

export const logoutAll = async () => {
  const token = await checkAndRefreshToken();
  const res = await fetch(`${BASE_URL}/auth/logout-all`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization": `Bearer ${token}`,
      }
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
};