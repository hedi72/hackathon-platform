import { BASE_URL } from "@/src/api/config/apiConfig";
import { checkAndRefreshToken } from "../auth/checkAndRefreshToken";


export async function getHackathonRegistrations(hackathonId: string) {
      const token = await checkAndRefreshToken();
  const res = await fetch(`${BASE_URL}/hackathon/${hackathonId}/registration`, {
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch registered hackers");
  }

  return res.json();
}
