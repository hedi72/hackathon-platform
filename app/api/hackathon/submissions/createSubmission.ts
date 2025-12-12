import { BASE_URL } from "@/src/api/config/apiConfig";

export async function createSubmission(hackathonId, token, submissionData) {
  try {
    const res = await fetch(
      `${BASE_URL}/hackathon/${hackathonId}/submissions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submissionData),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to submit BUIDL");
    }

    return await res.json();
  } catch (error) {
    console.error("🔥 BUIDL Submission Error:", error);
    throw error;
  }
}
