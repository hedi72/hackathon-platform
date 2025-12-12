"use client";
import { getCurrentUser } from "@/app/api/auth/getCurrentUser";
import React, { createContext, useContext, useEffect, useState } from "react";

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
      // const stored = localStorage.getItem("user");

      // if (stored) {
      //   try {
      //     const parsed = JSON.parse(stored);
      //     setUser(parsed);
      //     console.log("🔄 Loaded user from localStorage:", parsed);
      //     return;
      //   } catch (e) {
      //     console.error("Invalid user JSON in localStorage");
      //   }
      // }

      // No stored user → fetch from API
      const newUser = await getCurrentUser();
      if (newUser) {
        setUser(newUser);
        console.log("🔄 Fetched user from API:", newUser);
        // localStorage.setItem("user", JSON.stringify(newUser));
        
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