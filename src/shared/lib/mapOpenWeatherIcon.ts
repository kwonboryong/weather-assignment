import type { WeatherIconKey } from "@/entities/weather/model/types";

export function mapOpenWeatherIcon(main?: string): WeatherIconKey | undefined {
  if (!main) return undefined;

  switch (main) {
    case "Clear":
      return "sun";
    case "Clouds":
      return "cloud";
    case "Rain":
    case "Drizzle":
      return "rain";
    case "Snow":
      return "snow";
    case "Thunderstorm":
      return "thunder";
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Ash":
      return "fog";
    case "Squall":
    case "Tornado":
      return "wind";
    default:
      return "cloud";
  }
}
