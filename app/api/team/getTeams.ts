import { BASE_URL } from "@/src/api/config/apiConfig";

export async function getHackathonTeams(hackathonId: string, token: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/hackathon/${hackathonId}/teams`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to load teams");
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Error fetching teams:", err);
    throw err;
  }
}
