import type { HourlyWeatherItem } from "@/entities/weather/model/types";
import { HourlyWeatherCard } from "@/entities/weather/ui/HourlyWeatherCard";

type Props = {
  items: HourlyWeatherItem[];
};

export function HourlyWeatherSection({ items }: Props) {
  return (
    <section
      aria-labelledby="forecast-title"
      className="px-6 py-6 bg-white border border-indigo-100 border-none shadow-lg mt-9 rounded-3xl sm:px-8 sm:py-6 backdrop-blur-sm"
    >
      <header className="flex items-center justify-between">
        <h2
          id="forecast-title"
          className="text-lg font-semibold text-indigo-500"
        >
          시간대 별 기온
        </h2>
      </header>

      <nav
        aria-label="Forecast list"
        className="
          mt-5 overflow-x-auto
          pb-3
          [-webkit-overflow-scrolling:touch]
        "
      >
        <ul className="flex gap-5 pr-2 min-w-max">
          {items.map((item, i) => (
            <li key={`${item.hour}-${i}`} className="shrink-0">
              <HourlyWeatherCard
                hour={item.hour}
                temp={item.temp}
                weatherIcon={item.weatherIcon}
              />
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
