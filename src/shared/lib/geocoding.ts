import { instance } from "@/shared/api/axios";
import type { Coords } from "@/shared/lib/getCurrentPosition";

type ReverseGeoItem = {
  name: string;
  country: string;
  state?: string;
};

export async function reverseGeocode({ lat, lon }: Coords) {
  const res = await instance.get<ReverseGeoItem[]>("/geo/1.0/reverse", {
    params: { lat, lon, limit: 1 },
  });

  return res.data[0] ?? null;
}
