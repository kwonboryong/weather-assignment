import type { HourlyWeatherItem } from "@/entities/weather/model/types";
import { WEATHER_ICON_MAP } from "@/entities/weather/ui/weatherIcons";

export function HourlyWeatherCard({
  hour,
  temp,
  weatherIcon,
}: HourlyWeatherItem) {
  const icon = weatherIcon ? WEATHER_ICON_MAP[weatherIcon] : "🚨";

  return (
    <article
      className="
        w-20 h-36 px-2 py-5
        rounded-2xl bg-[#7284FF] text-white
        sm:w-24 sm:h-44 sm:px-3 sm:py-8
        md:w-28 md:h-48
      "
    >
      <header className="text-center">
        <p className="text-xs sm:text-sm">{hour}</p>
        <div
          className="grid mt-3 text-4xl leading-none select-none place-items-center sm:text-5xl"
          aria-hidden
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
