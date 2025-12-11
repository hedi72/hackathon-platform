import { BASE_URL } from "../config/apiConfig";

// 📨 1. Request password reset (sends reset email)
export interface ResetPasswordRequestInput {
  email: string;
}

export async function requestPasswordReset(data: ResetPasswordRequestInput) {
  try {
    const response = await fetch(`${BASE_URL}/auth/password/reset/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || "Invalid email format");
    }

    return resData;
  } catch (error) {
    throw error;
  }
}

// 🔐 2. Reset password using token
export interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

export async function resetPassword(data: ResetPasswordInput) {
  try {
    const response = await fetch(`${BASE_URL}/auth/password/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error(resData.message || "Invalid or expired token");
    }

    return resData;
  } catch (error) {
    throw error;
  }
}
