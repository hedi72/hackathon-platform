"use client";
import { getCurrentUser } from "@/app/api/auth/getCurrentUser";
import React, { createContext, useContext, useEffect, useState } from "react";
import { checkAndRefreshToken } from "../api/auth/checkAndRefreshToken";

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  bio?: string;
  role: string;
  createdAt: string;
  providers: string[];
  twoFactorEnabled: boolean;
  image: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
 useEffect(() => {
  const loadUser = async () => {
    const token = await checkAndRefreshToken();
    if (!token) return;

    const user = await getCurrentUser();
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  loadUser();
}, []);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};