import { BASE_URL } from "@/src/api/config/apiConfig";
import { checkAndRefreshToken } from "../checkAndRefreshToken";


export async function sendVerifyEmail() {
    console.log("Registering user with data:");
    const token = await checkAndRefreshToken();
  try {
    const response = await fetch(`${BASE_URL}/auth/email/verify/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        Accept: "application/json",
      },
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


