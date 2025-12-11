"use client";

import { BASE_URL } from "../config/apiConfig";

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export async function getCategories(): Promise<Category[]> {

  try {
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const details = await res.json().catch(() => ({}));
      throw new Error(details.message || "Failed to fetch categories");
    }

    return res.json();
  } catch (err: any) {
    console.error("❌ getCategories error:", err);
    throw new Error(err.message || "Unknown error");
  }
}
