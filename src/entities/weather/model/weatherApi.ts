import { instance } from "@/shared/api/axios";
import type { Coords } from "@/shared/lib/getCurrentPosition";

export async function getCurrentWeather({ lat, lon }: Coords) {
  const res = await instance.get("/data/2.5/weather", {
    params: { lat, lon },
  });

  return res.data;
}
