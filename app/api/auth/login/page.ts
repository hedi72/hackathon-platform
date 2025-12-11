import { BASE_URL } from "@/src/api/config/apiConfig";


export interface LoginInput {
  identifier: string; // email or username
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    isEmailVerified: boolean;
  };
}

export async function loginUser(dataInput: LoginInput): Promise<LoginResponse | null> {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataInput),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Login failed:", data);
      throw new Error(data.message || "Invalid credentials");
    }

    console.log("✅ Login successful:", data);
    return data as LoginResponse;
  } catch (error) {
    console.error("🚨 Network error:", error);
    throw error;
  }
}
