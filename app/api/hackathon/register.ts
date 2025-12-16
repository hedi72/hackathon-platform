import { BASE_URL } from "@/src/api/config/apiConfig";
import { checkAndRefreshToken } from "../auth/checkAndRefreshToken";


export async function registerToHackathon(
  hackathonId: string,
  token: string,
  
  answers?: {
    questionId: string;
    value: string[];
  }[],
  passCode?: string,
) {
  const body: any = {};

  if (passCode) body.passCode = passCode;
  if (answers && answers.length > 0) body.answers = answers;

  const res = await fetch(
    `${BASE_URL}/hackathon/${hackathonId}/registration`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registration failed");
  }

  return res.json();
}

