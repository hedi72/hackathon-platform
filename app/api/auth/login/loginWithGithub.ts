import { BASE_URL } from "@/src/api/config/apiConfig";

export async function loginWithGithub() {
  try {
    const githubUrl = `${BASE_URL}/auth/github/login`;
    console.log("➡️ Redirecting to:", githubUrl);

    // Direct redirect (no need to prefetch)
    window.location.href = githubUrl;
  } catch (error) {
    console.error("❌ GitHub login error:", error);
    alert("Could not connect to GitHub. Please try again.");
  }
}