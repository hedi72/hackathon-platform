import { BASE_URL } from "@/src/api/config/apiConfig";


export async function registerToHackathon(hackathonId: string, token: string, passCode?: string, answers?: any[]) {
  try {
    const res = await fetch(`${BASE_URL}/hackathon/${hackathonId}/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        passCode: passCode || "",
        registrationAnswers: answers || []
      })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Registration failed (${res.status})`);
    }

    return await res.json();

  } catch (error) {
    console.error("❌ Registration error:", error);
    throw error;
  }
}
