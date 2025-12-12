import { checkAndRefreshToken } from "@/app/api/auth/checkAndRefreshToken";
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

  const token = await checkAndRefreshToken();
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



export interface GetTeamsResponse {
  data: {
    id: string;
    name: string;
    tagline?: string;
    image?: string;
    createdAt: string;
    memberCount: number;
    members: {
      id: string;
      isLeader: boolean;
      joinedAt: string;
      user: {
        id: string;
        username: string;
        name: string;
        image?: string;
      };
    }[];
  }[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface GetTeamsParams {
  search?: string;
  page?: number;
  limit?: number;
}

export async function getTeams(
  hackathonId: string,
  params: GetTeamsParams = {}
): Promise<GetTeamsResponse> {
  try {
    const query = new URLSearchParams();

    if (params.search) query.append("search", params.search);
    if (params.page) query.append("page", String(params.page));
    if (params.limit) query.append("limit", String(params.limit));

    const url = `${BASE_URL}/hackathon/${hackathonId}/teams?${query.toString()}`;

    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // auto works for public hackathons
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || `Failed to fetch teams (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}
