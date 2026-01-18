import type { HourlyWeatherItem } from "@/entities/weather/model/types";
import { WEATHER_ICON_MAP } from "@/entities/weather/ui/weatherIconMap";

export function HourlyWeatherCard({
  hour,
  temp,
  weatherIcon,
}: HourlyWeatherItem) {
  const icon = weatherIcon ? WEATHER_ICON_MAP[weatherIcon] : "🚨";

  return (
    <article
      className="w-20 px-2 py-5 text-white bg-indigo-500 h-36 rounded-2xl sm:w-24 sm:h-44 sm:px-3 sm:py-8 md:w-28 md:h-48"
      aria-label={`${hour} 기온 ${temp}`}
    >
      <header className="text-center">
        <p className="text-xs sm:text-sm">{hour}</p>
        <div
          className="grid mt-3 text-4xl leading-none select-none place-items-center sm:text-5xl"
          aria-hidden="true"
        >
          {icon}
        </div>
      </header>

      <footer className="mt-4 text-center sm:mt-5">
        <p className="text-sm font-semibold sm:text-xl">{temp}</p>
      </footer>
    </article>
  );
}
