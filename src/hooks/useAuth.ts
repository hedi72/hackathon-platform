import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";
import { getCurrentUser } from "@/app/api/auth/getCurrentUser";

export function useAuth() {
  const { user, isLoading, setUser, setLoading, updateUserImage } = useAuthStore();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  useEffect(() => {
    if (!token) return;

    const loadUser = async () => {
      setLoading(true);
      try {
        const res = await getCurrentUser(token)
        setUser(res);
      } catch (err) {
        console.error("Failed to load user", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token, setUser, setLoading]);

  return {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(token),
    updateUserImage,
  };
}
