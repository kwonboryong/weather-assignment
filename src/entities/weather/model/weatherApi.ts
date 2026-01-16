import { instance } from "@/shared/api/axios";
import type { Coords } from "@/shared/lib/getCurrentPosition";
import type {
  CurrentWeatherResponse,
  HourlyWeatherResponse,
} from "@/entities/weather/model/types";

export async function getCurrentWeather({ lat, lon }: Coords) {
  const res = await instance.get<CurrentWeatherResponse>("/data/2.5/weather", {
    params: { lat, lon },
  });

  return res.data;
}

export async function getHourlyWeather({ lat, lon }: Coords) {
  const res = await instance.get<HourlyWeatherResponse>("/data/3.0/onecall", {
    params: {
      lat,
      lon,
      exclude: "current,minutely,daily,alerts",
    },
  });

  return res.data;
}
