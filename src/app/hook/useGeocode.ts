"use client";
import { useCallback, useState } from "react";

export type GeoResult = {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
};

export function useGeocode() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback(async () => {
    const q = query.trim();
    if (!q) { setResults([]); return; }
    setIsSearching(true);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results ?? []);
    } finally {
      setIsSearching(false);
    }
  }, [query]);

  return { query, setQuery, results, setResults, isSearching, search };
}
