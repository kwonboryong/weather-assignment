import { useQuery } from "@tanstack/react-query";
import type { Coords } from "@/shared/lib/getCurrentPosition";
import { reverseGeocode } from "@/shared/lib/geocoding/geocodingApi";
import {
  getCurrentWeather,
  getHourlyWeather,
} from "@/entities/weather/model/weatherApi";

// 현재 위치 기반 날씨
export function useCurrentWeatherByCoords(coords: Coords | null) {
  const locationQuery = useQuery({
    queryKey: ["reverse-geocode", coords?.lat, coords?.lon],
    queryFn: () => {
      if (!coords) throw new Error("location coords가 없습니다.");

      return reverseGeocode(coords);
    },
    enabled: !!coords,
    refetchOnWindowFocus: false,
  });

  const weatherQuery = useQuery({
    queryKey: ["current-weather", coords?.lat, coords?.lon],
    queryFn: () => {
      if (!coords) throw new Error("weather coords가 없습니다.");

      return getCurrentWeather(coords);
    },
    enabled: !!coords,
    refetchOnWindowFocus: false,
  });

  const locationLabel = locationQuery.data
    ? `${locationQuery.data.local_names?.ko ?? locationQuery.data.name}`
    : "위치 확인 중...";

  return { locationQuery, weatherQuery, locationLabel };
}

// 시간대별 날씨
export function useHourlyWeatherByCoords(coords: Coords | null) {
  return useQuery({
    queryKey: ["hourly-weather", coords?.lat, coords?.lon],
    queryFn: () => {
      if (!coords) throw new Error("hourly coords가 없습니다.");

      return getHourlyWeather(coords);
    },
    enabled: !!coords,
    refetchOnWindowFocus: false,
  });
}
