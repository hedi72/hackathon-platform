import { BASE_URL } from "@/src/api/config/apiConfig";
import { checkAndRefreshToken } from "@/app/api/auth/checkAndRefreshToken";

export async function updateTeamPosition(
  hackathonId: string,
  teamId: string,
  positionId: string,
  payload: {
    title: string;
    description: string;
    requiredSkills: string[];
    status: "OPEN" | "CLOSED";
  }
) {
  const token = await checkAndRefreshToken();
  if (!token) throw new Error("Unauthorized");

  const res = await fetch(
    `${BASE_URL}/hackathon/${hackathonId}/teams/${teamId}/positions/${positionId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update position");
  }

  return res.json();
}
