import { useQueries, useQueryClient } from "@tanstack/react-query";
import type {
  CurrentWeatherResponse,
  WeatherSummaryBaseData,
} from "@/entities/weather/model/types";
import { getCurrentWeather } from "@/entities/weather/model/weatherApi";
import { mapOpenWeatherIcon } from "@/shared/lib/mappers/mapOpenWeatherIcon";
import { forwardGeocode } from "@/entities/location/model/geocodingApi";
import { TIME } from "@/shared/lib/query/time";
import type { Coords } from "@/shared/lib/getCurrentPosition";
import {
  geocodeKeys,
  weatherKeys,
  bookmarkKeys,
} from "@/shared/lib/query/query-keys";

export type BookmarkSummary = WeatherSummaryBaseData & { id: string };

export function useBookmarkSummaries(ids: string[]) {
  const queryClient = useQueryClient();

  return useQueries({
    queries: ids.map((id) => ({
      queryKey: bookmarkKeys.summary(id),
      enabled: !!id,
      staleTime: TIME.minute * 10,
      gcTime: TIME.hour,
      retry: 1,

      queryFn: async (): Promise<BookmarkSummary | null> => {
        const coords = await queryClient.fetchQuery<Coords | null>({
          queryKey: geocodeKeys.forward(id),
          queryFn: () => forwardGeocode(id),
          staleTime: TIME.day * 7,
          gcTime: TIME.day * 30,
        });

        if (!coords) return null;

        const weather = await queryClient.fetchQuery<CurrentWeatherResponse>({
          queryKey: weatherKeys.current(coords),
          queryFn: () => getCurrentWeather(coords),
          staleTime: TIME.minute * 5,
          gcTime: TIME.hour,
        });

        return {
          id,
          location: id.replaceAll("-", " "),
          currentTemp: weather.main.temp,
          minTemp: weather.main.temp_min,
          maxTemp: weather.main.temp_max,
          weatherIcon: mapOpenWeatherIcon(weather.weather?.[0]?.main),
        };
      },
    })),
  });
}
