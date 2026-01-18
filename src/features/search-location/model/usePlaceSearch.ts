import { useMemo } from "react";
import districtsRaw from "@/shared/assets/korea_districts.json";
import { parseDistricts } from "@/shared/lib/places/parseDistricts";
import type { PlaceItem } from "@/shared/lib/places/types";

export function usePlaceSearch(query: string, limit = 20) {
  // 전체 장소 목록(JSON → PlaceItem[])
  const allPlaces = useMemo(() => {
    return parseDistricts(districtsRaw as string[]);
  }, []);

  // 입력값(q) → 매칭 결과
  const { results, total } = useMemo(() => {
    const q = query.trim();

    if (!q) return { results: [] as PlaceItem[], total: 0 };

    const matched = allPlaces.filter((item) => {
      return item.full.includes(q) || item.parts.some((p) => p.includes(q));
    });

    return {
      results: matched.slice(0, limit),
      total: matched.length,
    };
  }, [allPlaces, query, limit]);

  const hasMore = total > limit;

  return { results, total, hasMore };
}
