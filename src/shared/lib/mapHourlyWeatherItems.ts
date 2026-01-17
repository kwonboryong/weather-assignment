import type {
  HourlyWeatherItem,
  HourlyWeatherResponse,
} from "@/entities/weather/model/types";
import { mapOpenWeatherIcon } from "@/shared/lib/mapOpenWeatherIcon";

export function mapHourlyWeatherItems(
  data: HourlyWeatherResponse | undefined,
  limit = 8,
): HourlyWeatherItem[] {
  if (!data?.hourly) return [];

  return data.hourly.slice(0, limit).map((h) => {
    const offsetSec = data.timezone_offset ?? 0;
    const localMs = (h.dt + offsetSec) * 1000;
    const hour = new Date(localMs).getUTCHours();

    return {
      hour: `${hour}시`,
      temp: `${Math.round(h.temp)}°C`,
      weatherIcon: mapOpenWeatherIcon(h.weather?.[0]?.main),
    };
  });
}
