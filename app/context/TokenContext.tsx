"use client";

import { checkAndRefreshToken } from "@/app/api/auth/checkAndRefreshToken";
import { refreshTokenRequest } from "@/app/api/auth/login/refreshToken";
import React, { createContext, useContext, useEffect, useState } from "react";

interface TokenContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  refreshToken: () => Promise<string | null>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  // ✅ real refreshToken function exposed in context
  const refreshToken = async () => {
    try {
      const token = await checkAndRefreshToken();
      if (!token) throw new Error("No token returned");
      setToken(token);
      localStorage.setItem("token", token as string);
      console.log("✅ Token refreshed");
      return token;
    } catch (e) {
      // setToken(null);
      // localStorage.removeItem("token");
      console.log("❌ Token refresh failed");
      return null;
    }
  };

  // Refresh token on first load
  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken, refreshToken }}>
      {children}
    </TokenContext.Provider>
  );
}

// Hook
export const useToken = () => {
  const ctx = useContext(TokenContext);
  if (!ctx) throw new Error("useToken must be inside TokenProvider");
  return ctx;
};