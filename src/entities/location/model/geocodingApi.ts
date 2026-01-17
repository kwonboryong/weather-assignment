import { instance } from "@/shared/api/axios";
import type { Coords } from "@/shared/lib/getCurrentPosition";

export type ReverseGeoItem = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  local_names?: {
    ko?: string;
  };
};

type ForwardGeoItem = {
  name: string;
  country: string;
  lat: number;
  lon: number;
  local_names?: {
    ko?: string;
  };
};

// 좌표 → 장소명
export async function reverseGeocode({
  lat,
  lon,
}: Coords): Promise<ReverseGeoItem | null> {
  const res = await instance.get<ReverseGeoItem[]>("/geo/1.0/reverse", {
    params: { lat, lon, limit: 1, lang: "ko" },
  });

  return res.data[0] ?? null;
}

// 장소명 → 좌표(장소를 상위 행정구역으로 줄여가며 재시도)
export async function forwardGeocode(place: string): Promise<Coords | null> {
  const normalized = place.trim().replaceAll("-", " ");
  if (!normalized) return null;

  // Geocoding API 호출
  const request = async (q: string): Promise<Coords | null> => {
    const res = await instance.get<ForwardGeoItem[]>("/geo/1.0/direct", {
      params: { q: `${q},KR`, limit: 1 },
    });

    const first = res.data?.[0];
    return first ? { lat: first.lat, lon: first.lon } : null;
  };

  // 1차 시도: 전체 주소(시/구/동) 검색
  const firstTry = await request(normalized);

  if (firstTry) return firstTry;

  // 2차 시도: 주소 뒤에서부터 상세 지역을 하나씩 제거하며 재검색
  const parts = normalized.split(" ").filter(Boolean);

  for (let i = parts.length - 1; i >= 1; i--) {
    const shortened = parts.slice(0, i).join(" ");
    const hit = await request(shortened);

    if (hit) return hit;
  }

  return null;
}
