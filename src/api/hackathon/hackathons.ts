import { BASE_URL } from "../config/apiConfig";

export interface HackathonQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  type?: string;
  category?: string;
  isPrivate?: boolean;
  prizePoolFrom?: number;
  prizePoolTo?: number;
  startDateFrom?: string;
  startDateTo?: string;
  organizationId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface HackathonResponse {
  data: any[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export async function getHackathons(
  params: HackathonQueryParams = {}
): Promise<HackathonResponse> {
  try {

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, String(value));
      }
    });

    const url = `${
      BASE_URL
    }/hackathon?${searchParams.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch hackathons (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    throw error;
  }
}
