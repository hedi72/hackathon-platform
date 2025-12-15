"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Category, getCategories } from "../api/category/getAllCategories";

export function useCategories() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loadingCategories, setLoading] = useState(true);
  const [errorLoadingCategories, setError] = useState<string | null>(null);

  const fetchedRef = useRef(false);
  const fetchingRef = useRef(false);

  const fetchCategories = useCallback(async () => {
    if (fetchingRef.current) return;

    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Failed to load categories");
    } finally {
      fetchingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loadingCategories,
    errorLoadingCategories,
    refresh: fetchCategories, // now safe
  };
}
