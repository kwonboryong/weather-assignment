import type { Coords } from "@/shared/lib/getCurrentPosition";
import { useReverseGeocode } from "@/entities/location/model/useGeocodeQueries";
import {
  useCurrentWeather,
  useHourlyWeather,
} from "@/entities/weather/model/useWeatherQueries";

type Options = {
  withHourly?: boolean;
};

export function useWeatherByCoords(
  coords: Coords | null,
  options: Options = {},
) {
  const { withHourly = true } = options;

  const locationQuery = useReverseGeocode(coords);
  const currentWeatherQuery = useCurrentWeather(coords);
  const hourlyWeatherQuery = useHourlyWeather(coords);

  const locationLabel = locationQuery.data
    ? `${locationQuery.data.local_names?.ko ?? locationQuery.data.name}`
    : "위치 확인 중...";

  return {
    locationQuery,
    currentWeatherQuery,
    hourlyWeatherQuery: withHourly ? hourlyWeatherQuery : undefined,
    locationLabel,
  };
}
