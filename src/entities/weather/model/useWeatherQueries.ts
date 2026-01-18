import { useQuery } from "@tanstack/react-query";
import {
  getCurrentWeather,
  getHourlyWeather,
} from "@/entities/weather/model/weatherApi";
import type { Coords } from "@/shared/lib/getCurrentPosition";

export function useCurrentWeather(coords: Coords | null) {
  return useQuery({
    queryKey: ["current-weather", coords?.lat, coords?.lon],
    queryFn: () => {
      if (!coords) throw new Error("weather coords가 없습니다.");
      return getCurrentWeather(coords);
    },
    enabled: !!coords,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

export function useHourlyWeather(coords: Coords | null) {
  return useQuery({
    queryKey: ["hourly-weather", coords?.lat, coords?.lon],
    queryFn: () => {
      if (!coords) throw new Error("hourly coords가 없습니다.");

      return getHourlyWeather(coords);
    },
    enabled: !!coords,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60 * 3,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
