import { useQueries } from "@tanstack/react-query";
import type { WeatherSummaryBaseData } from "@/entities/weather/model/types";
import { forwardGeocode } from "@/shared/lib/geocoding/geocodingApi";
import { getCurrentWeather } from "@/entities/weather/model/weatherApi";
import { mapOpenWeatherIcon } from "@/shared/lib/mappers/mapOpenWeatherIcon";

export type BookmarkSummary = WeatherSummaryBaseData & { id: string };

export function useBookmarkSummaries(ids: string[]) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: ["bookmark-summary", id],
      queryFn: async (): Promise<BookmarkSummary | null> => {
        const coords = await forwardGeocode(id);

        if (!coords) return null;

        const weather = await getCurrentWeather(coords);

        return {
          id,
          location: id.replaceAll("-", " "),
          currentTemp: weather.main.temp,
          minTemp: weather.main.temp_min,
          maxTemp: weather.main.temp_max,
          weatherIcon: mapOpenWeatherIcon(weather.weather?.[0]?.main),
        };
      },
      enabled: Boolean(id),
      staleTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    })),
  });
}
