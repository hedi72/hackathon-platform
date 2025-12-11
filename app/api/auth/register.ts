import { BASE_URL } from "../config/apiConfig";


export interface RegisterInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
  };
}

export async function registerUser(dataInput: RegisterInput) {
    console.log("Registering user with data:", dataInput);
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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


