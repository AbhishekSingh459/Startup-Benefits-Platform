"use client";

import { useState, useEffect } from "react";
import { getDeals } from "@/lib/api";
import type { Deal } from "@/lib/types"; // or wherever Deal type lives

export const useDeals = (
  category?: string,
  searchTerm?: string
) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getDeals()
      .then((data) => {
        let filtered = data;

        if (category && category !== "All") {
          filtered = filtered.filter(
            (d: Deal) => d.category === category
          );
        }

        if (searchTerm) {
          filtered = filtered.filter(
            (d: Deal) =>
              d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              d.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setDeals(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category, searchTerm]);

  return { deals, loading };
};
