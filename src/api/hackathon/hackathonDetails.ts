import { BASE_URL } from "../config/apiConfig";

export interface HackathonDetails {
  id: string;
  title: string;
  slug: string;
  organizationId: string | null;
  banner: string | null;
  tagline: string | null;
  description: string | null;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  prizePool: number;
  prizeToken: string;
  categoryId: string | null;
  tags: string[];
}

export async function getHackathonDetails(identifier: string): Promise<HackathonDetails> {
  try {
    const url = `${BASE_URL}/hackathon/${identifier}`;
    console.log("Fetching Hackathon Details from URL:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch hackathon details (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching hackathon details:", error);
    throw error;
  }
}
