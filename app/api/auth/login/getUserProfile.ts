// types/user.ts

import { BASE_URL } from "@/src/api/config/apiConfig";

export interface UserProfileResponse {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | string;

  bio: string | null;
  image: string | null;

  profession: string | null;
  location: string | null;
  org: string | null;

  skills: string[];

  website: string | null;
  github: string | null;
  linkedin: string | null;
  telegram: string | null;
  twitter: string | null;
  whatsapp: string | null;

  otherSocials: string[];

  providers: string[];

  isEmailVerified: boolean;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  passwordUpdatedAt: string | null;

  twoFactorEnabled: boolean;
  twoFactorConfirmedAt: string | null;

  isDisabled: boolean;
  disabledAt: string | null;
  disabledReason: string | null;

  createdAt: string;
  updatedAt: string;
}

export async function getUserProfile(username: string): Promise<UserProfileResponse> {
  try {
    const res = await fetch(`${BASE_URL}/profile/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to load profile");
    }

    return res.json();
  } catch (err: any) {
    console.error("Error fetching profile:", err.message);
    throw err;
  }
}