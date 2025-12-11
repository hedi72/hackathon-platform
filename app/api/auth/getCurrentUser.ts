import { BASE_URL } from "@/src/api/config/apiConfig";
import { checkAndRefreshToken } from "./checkAndRefreshToken";


export async function getCurrentUser(token?: string) {
  try {
    const storedToken = await checkAndRefreshToken();
    const res = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include", 
      headers: { "Accept": "application/json",  
        ...(storedToken ? { "Authorization": `Bearer ${storedToken}` } : {}),
      },
    });

    if (!res.ok) {
      console.error("❌ /auth/me failed:", res.status);
      return null;
    }

    const data = await res.json();
    localStorage.setItem("name", data.username || "");
    console.log("✅ Current user:", data);
    return data;
  } catch (err) {
    console.error("⚠️ Error fetching current user:", err);
    return null;
  }
}
