import { checkAndRefreshToken } from "@/src/api/checkAndRefreshToken";
import { BASE_URL } from "@/src/api/config/apiConfig";


export async function applyToPosition(
  hackathonId: string,
  teamId: string,
  positionId: string,
  message: string
) {
  const token = await checkAndRefreshToken();

  if (!token) {
    throw new Error("Authentication required");
  }

  const res = await fetch(
    `${BASE_URL}/hackathon/${hackathonId}/teams/${teamId}/positions/${positionId}/apply`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to apply to position");
  }

  return res.json();
}
