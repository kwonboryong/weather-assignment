import { useQuery } from "@tanstack/react-query";
import type { Coords } from "@/shared/lib/getCurrentPosition";
import { reverseGeocode } from "@/shared/lib/geocoding";
import { getCurrentWeather } from "@/entities/weather/model/weatherApi";

export function useCurrentWeatherByCoords(coords: Coords | null) {
  const enabled = !!coords;

  const locationQuery = useQuery({
    queryKey: ["reverse-geocode", coords?.lat, coords?.lon],
    queryFn: () => {
      if (!coords) throw new Error("location coords가 없습니다.");

      return reverseGeocode(coords);
    },
    enabled,
  });

  const weatherQuery = useQuery({
    queryKey: ["current-weather", coords?.lat, coords?.lon],
    queryFn: () => {
      if (!coords) throw new Error("weather coords가 없습니다.");

      return getCurrentWeather(coords);
    },
    enabled,
  });

  const locationLabel = locationQuery.data
    ? `${locationQuery.data.local_names?.ko ?? locationQuery.data.name}, ${
        locationQuery.data.country
      }`
    : "위치 확인 중...";

  return { locationQuery, weatherQuery, locationLabel };
}
