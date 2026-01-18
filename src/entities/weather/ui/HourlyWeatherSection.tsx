import type { HourlyWeatherItem } from "@/entities/weather/model/types";
import { HourlyWeatherCard } from "@/entities/weather/ui/HourlyWeatherCard";
import { CARD_SURFACE } from "@/entities/weather/ui/WeatherSummaryCard.Home";

type Props = {
  items: HourlyWeatherItem[];
};

export function HourlyWeatherSection({ items }: Props) {
  return (
    <section
      aria-labelledby="forecast-title"
      className={`px-6 py-6 mt-9
        sm:px-8 sm:py-6
        ${CARD_SURFACE}
      `}
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
        aria-label="시간대별 기온 목록"
        tabIndex={0}
        className="mt-5 pb-3 overflow-x-auto [-webkit-overflow-scrolling:touch]"
      >
        <ul
          aria-label="시간대별 기온 카드 목록"
          className="flex gap-5 pr-2 min-w-max"
        >
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
