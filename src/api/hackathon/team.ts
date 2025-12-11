import { BASE_URL } from "../config/apiConfig";

export interface CreateTeamPayload {
  name: string;
  tagline?: string;
}

export interface CreateTeamResponse {
  message: string;
  data: any;
}

export async function createTeam(
  hackathonId: string,
  payload: CreateTeamPayload
): Promise<CreateTeamResponse> {
  try {
    const url = `${BASE_URL}/hackathon/${hackathonId}/teams`;

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || `Failed to create team (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
}
