"use client";

import { useEffect, useState, useCallback } from "react";
import { Category, getCategories } from "../api/category/getAllCategories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loadingCategories, setLoading] = useState<boolean>(true);
  const [errorLoadingCategories, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loadingCategories,
    errorLoadingCategories,
    refresh: fetchCategories,
  };
}
