import { BASE_URL } from "@/src/api/config/apiConfig";
import { checkAndRefreshToken } from "../auth/checkAndRefreshToken";

export async function requestJoinTeam(hackathonId: string, teamId: string) {
  const storedToken = await checkAndRefreshToken();
  const res = await fetch(
    `${BASE_URL}/hackathon/${hackathonId}/teams/${teamId}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        member_identifier: "self",
      }),
    }
  );

  if (!res.ok) throw new Error("Cannot request to join team");

  return res.json();
}
