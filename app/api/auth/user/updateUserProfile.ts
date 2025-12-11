import { BASE_URL } from "../../config/apiConfig";
import { checkAndRefreshToken } from "../checkAndRefreshToken";
import { UserProfileResponse } from "../login/getUserProfile";

export interface UpdateUserProfileDto {
  name?: string;
  username?: string;
  bio?: string;
  profession?: string;
  location?: string;
  org?: string;

  skills?: string[];
  website?: string;
  github?: string;
  linkedin?: string;
  telegram?: string;
  twitter?: string;
  whatsapp?: string;

  otherSocials?: string[];
}

export async function updateUserProfile(
  data: UpdateUserProfileDto, file: File | null = null
): Promise<UserProfileResponse> {
    const token = await checkAndRefreshToken();
  try {
console.log("form data prepared for update:", data, token);
     const formData = new FormData();
     if(file) {
         formData.append("image", file);
     }
      Object.entries(data).forEach(([key, value]) => {
        // Ignorer certains champs
        if (key === "username" || key === "email" || key === "image") return;

        // 1️⃣ Ne pas envoyer les strings vides
        if (typeof value === "string" && value.trim() === "") return;

        // 2️⃣ Ne pas envoyer les arrays vides
        if (Array.isArray(value) && value.length === 0) return;

        // 3️⃣ Ne pas envoyer les valeurs null / undefined
        if (value === undefined || value === null) return;

        // 4️⃣ Ajouter au FormData
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(`${key}[]`, v));
        } else {
          formData.append(key, value);
        }
      });


    const res = await fetch(`${BASE_URL}/profile`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
         Accept: "application/json",
      },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update profile");
    }
    return res.json();
  } catch (error: any) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
}

export interface UpdateInput {
  username: string;
}

export async function updateUsername(dataInput: UpdateInput) {
  const token = await checkAndRefreshToken();
  try {
    const response = await fetch(`${BASE_URL}/profile/username`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(dataInput),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register");
    }

    return data; 
  } catch (error: any) {
    throw new Error(error.message || "Network error — please check the API server.");
  }
}

export async function updateEmail(dataInput: { email: string }) {
  const token = await checkAndRefreshToken();
  try {
    const response = await fetch(`${BASE_URL}/profile/email`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(dataInput),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to register");
    }

    return data; 
  } catch (error: any) {
    throw new Error(error.message || "Network error — please check the API server.");
  }
}
