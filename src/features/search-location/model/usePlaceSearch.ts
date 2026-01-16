import { useMemo } from "react";
import districtsRaw from "@/shared/assets/korea_districts.json";
import { parseDistricts } from "@/shared/lib/places/parseDistricts";
import type { PlaceItem } from "@/shared/lib/places/types";

const LIMIT = 20;

export function usePlaceSearch(query: string) {
  // 전체 장소 목록(JSON → PlaceItem[])
  const allPlaces = useMemo(() => {
    return parseDistricts(districtsRaw as string[]);
  }, []);

  // 입력값(q) → 매칭 결과
  const results: PlaceItem[] = useMemo(() => {
    const q = query.trim();

    if (!q) return [];

    const matched = allPlaces.filter((item) => {
      return item.full.includes(q) || item.parts.some((p) => p.includes(q));
    });

    return matched.slice(0, LIMIT);
  }, [allPlaces, query]);

  return { results };
}
