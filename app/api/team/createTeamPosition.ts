import { checkAndRefreshToken } from "@/src/api/checkAndRefreshToken";
import { BASE_URL } from "@/src/api/config/apiConfig";

export async function createTeamPosition(
  hackathonId: string,
  teamId: string,
  payload: {
    title: string;
    description: string;
    requiredSkills: string[];
  }
) {
  
  let token = await checkAndRefreshToken();

  if (!token) {
    throw new Error("Authentication required");
  }

 
  if (typeof token === "string" && token.startsWith('"')) {
    token = JSON.parse(token);
  }

  const res = await fetch(
    `${BASE_URL}/hackathon/${hackathonId}/teams/${teamId}/positions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create position");
  }

  return res.json();
}
