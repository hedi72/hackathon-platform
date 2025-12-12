import { checkAndRefreshToken } from "@/app/api/auth/checkAndRefreshToken";
import { BASE_URL } from "../config/apiConfig";

export interface InviteToTeamPayload {
  member_identifier: string; 
}

export interface InviteToTeamResponse {
  message: string;
  data?: any;
}

export async function inviteMemberToTeam(
  hackathonId: string,
  teamId: string,
  payload: InviteToTeamPayload
): Promise<InviteToTeamResponse> {
  try {
    const url = `${BASE_URL}/hackathon/${hackathonId}/teams/${teamId}/members`;

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

      throw new Error(
        errorBody.message ||
        `Failed to invite user (${res.status})`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error inviting to the team:", error);
    throw error;
  }
}

export async function acceptTeamInvitation(
  hackathonId: string,
  teamId: string,
  invitationId: string
): Promise<{ message: string; data?: any }> {
  try {
    const url = `${BASE_URL}/hackathon/${hackathonId}/teams/${teamId}/invitations/${invitationId}/accept`;

    const token = await checkAndRefreshToken();

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || `Failed to accept invitation (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error accepting invitation:", error);
    throw error;
  }
}

export async function declineTeamInvitation(
  hackathonId: string,
  teamId: string,
  invitationId: string
): Promise<{ message: string; data?: any }> {
  try {
    const url = `${BASE_URL}/hackathon/${hackathonId}/teams/${teamId}/invitations/${invitationId}/decline`;

    const token = await checkAndRefreshToken();

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      throw new Error(errorBody.message || `Failed to decline invitation (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error declining invitation:", error);
    throw error;
  }
}