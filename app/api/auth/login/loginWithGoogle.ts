import { BASE_URL } from "@/src/api/config/apiConfig";


export async function loginWithGoogle() {
  try {
    const googleUrl = `${BASE_URL}/auth/google/login`;
    console.log("🌐 Redirecting to Google:", googleUrl);
    window.location.href = googleUrl; // browser redirects

  } catch (error) {
    console.error("❌ Google login error:", error);
  }
}

