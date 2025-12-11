"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getCurrentUser } from "../getCurrentUser";
import { useToken } from "@/context/TokenContext";

export  function GithubCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const {token, setToken} = useToken();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      console.log("✅ GitHub token:", token);
      localStorage.setItem("token", token);
      setToken(token);

      // Get user info right after login
      getCurrentUser(token).then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("name", user.username || "");
          router.push("/");
        } else {
          console.warn("⚠️ No user returned from /auth/me");
          router.push("/signin");
        }
      });
    } else {
      console.error("❌ No token found in callback URL");
      router.push("/signin");
    }
  }, [params, router]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-700 dark:text-gray-200">
      <p>Signing you in with GitHub...</p>
    </div>
  );
}




export  function GoogleCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
    const {token, setToken} = useToken();

 useEffect(() => {
  // ✅ Grab token from URL if present and store it
  const tokenFromUrl = params.get("token");
  if (tokenFromUrl) {
    localStorage.setItem("token", tokenFromUrl);
    setToken(tokenFromUrl);
  }

  const token = localStorage.getItem("token");

  if (token) {
    console.log("✅ Google token:", token);
    getCurrentUser(token).then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
         localStorage.setItem("name", user.username || "");
        router.push("/");
      } else {
        console.warn("⚠️ No user returned from /auth/me");
        router.push("/signin");
      }
    });
  } else {
    console.error("❌ No token found in URL or localStorage");
    router.push("/signin");
  }
}, [params, router]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-700 dark:text-gray-200">
      <p>Signing you in with Google...</p>
    </div>
  );
}

export default function LinkedinCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const {token, setToken} = useToken();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      console.log("✅ LinkedIn token:", token);
      localStorage.setItem("token", token);
      setToken(token);

      // Immediately fetch authenticated user
      getCurrentUser(token).then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
           localStorage.setItem("name", user.username || "");
          router.push("/");
        } else {
          console.warn("⚠️ No user returned from /auth/me");
          router.push("/signin");
        }
      });
    } else {
      console.error("❌ No token found in LinkedIn callback URL");
      router.push("/signin");
    }
  }, [params, router]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-700 dark:text-gray-200">
      <p>Signing you in with LinkedIn...</p>
    </div>
  );
}