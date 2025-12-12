import { refreshTokenRequest } from "@/app/api/auth/login/refreshToken";
import {jwtDecode} from "jwt-decode";


interface DecodedToken {
  exp: number; // expiration timestamp (in seconds)
}

export async function checkAndRefreshToken(
): Promise<string | null> {
  let token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    const isExpired = decoded.exp * 1000 < Date.now();

    if (!isExpired) {
        console.log("Token valid in checkAndRefreshToken");
      return token; // still valid
    }

    // token is expired → refresh it
    const newToken = await refreshTokenRequest();
    console.log("Token refreshed in checkAndRefreshToken************", newToken);
    if(!newToken) return null;
    localStorage.setItem("token", newToken.token);
    return newToken.token;
  } catch (error) {
    console.error("Failed to decode token", error);
    return token;
  }
}