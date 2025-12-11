import { BASE_URL } from "@/src/api/config/apiConfig";

export async function loginWithLinkedin() {
  try {
    const linkedinUrl = `${BASE_URL}/auth/linkedin/login`;
    console.log("➡️ Redirecting to:", linkedinUrl);

    // Directly redirect to LinkedIn OAuth
    window.location.href = linkedinUrl;
  } catch (error) {
    console.error("❌ LinkedIn login error:", error);
    alert("Could not connect to LinkedIn. Please try again.");
  }
}