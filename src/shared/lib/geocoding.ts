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

export async function reverseGeocode({ lat, lon }: Coords) {
  const res = await instance.get<ReverseGeoItem[]>("/geo/1.0/reverse", {
    params: { lat, lon, limit: 1, lang: "ko" },
  });

  return res.data[0] ?? null;
}
