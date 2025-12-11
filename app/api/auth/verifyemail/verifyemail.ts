import { BASE_URL } from "../../config/apiConfig";
import { checkAndRefreshToken } from "../checkAndRefreshToken";
export interface VerifyInput {
  code: number;
}

export async function verifyEmail(dataInput: VerifyInput) {
  const token = await checkAndRefreshToken();
  try {
    const response = await fetch(`${BASE_URL}/auth/email/verify`, {
      method: "POST",
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


