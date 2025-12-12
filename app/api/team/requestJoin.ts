import { BASE_URL } from "@/src/api/config/apiConfig";

export async function requestJoinTeam(hackathonId, teamId, token) {
  const res = await fetch(
    `${BASE_URL}/hackathon/${hackathonId}/teams/${teamId}/members`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        member_identifier: "self",
      }),
    }
  );

  if (!res.ok) throw new Error("Cannot request to join team");

  return res.json();
}
