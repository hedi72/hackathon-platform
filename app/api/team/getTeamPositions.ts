import { BASE_URL } from "@/src/api/config/apiConfig";

export async function getTeamPositions(
  hackathonId: string,
  teamId: string,
  token: string
) {
  const res = await fetch(
    `${BASE_URL}/hackathon/${hackathonId}/teams/${teamId}/positions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch positions");
  }

  return res.json();
}
