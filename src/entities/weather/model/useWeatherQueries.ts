import { useQuery } from "@tanstack/react-query";
import {
  getCurrentWeather,
  getHourlyWeather,
} from "@/entities/weather/model/weatherApi";
import type { Coords } from "@/shared/lib/getCurrentPosition";
import { TIME } from "@/shared/lib/query/time";
import { weatherKeys } from "@/shared/lib/query/query-keys";

export function useCurrentWeather(coords: Coords | null) {
  return useQuery({
    queryKey: weatherKeys.current(coords as Coords),
    queryFn: () => {
      if (!coords) throw new Error("current-weather coords가 없습니다.");

      return getCurrentWeather(coords);
    },
    enabled: !!coords,
    staleTime: TIME.minute * 5,
    gcTime: TIME.hour,
  });
}

export function useHourlyWeather(coords: Coords | null) {
  return useQuery({
    queryKey: weatherKeys.hourly(coords as Coords),
    queryFn: () => {
      if (!coords) throw new Error("hourly-weather coords가 없습니다.");

      return getHourlyWeather(coords);
    },
    enabled: !!coords,
    staleTime: TIME.minute * 30,
    gcTime: TIME.hour * 3,
  });
}
