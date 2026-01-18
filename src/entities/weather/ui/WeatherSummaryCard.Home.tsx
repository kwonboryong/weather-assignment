import { Card, CardContent } from "@/shared/ui/shadcn/card";
import { MapPin } from "lucide-react";
import { WEATHER_ICON_MAP } from "@/entities/weather/ui/weatherIconMap";
import type { WeatherSummaryDefaultData } from "@/entities/weather/model/types";
import { TempMetricBlock } from "@/entities/weather/ui/TempMetricBlock";

type Props = {
  className?: string;
  data: WeatherSummaryDefaultData;
};

export const CARD_SURFACE = `
  bg-white/90 backdrop-blur-sm
  border border-indigo-100
  shadow-md
  rounded-2xl
`;

export function WeatherSummaryCardHome({ className = "", data }: Props) {
  const {
    location,
    dayOfWeek,
    date,
    currentTemp,
    minTemp,
    maxTemp,
    weatherIcon,
  } = data;

  return (
    <Card
      className={`w-full max-w-[500px] transition-all duration-200 relative
        ${CARD_SURFACE}
        ${className}
      `}
    >
      <CardContent className="p-6 max-sm:px-6 max-sm:py-4">
        <div
          className="flex flex-col gap-4 
        sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-3"
        >
          {/* 왼쪽 영역 */}
          <div className="flex flex-col min-w-0 gap-4 sm:gap-2 sm:justify-between">
            {/* 위치 + 날짜 */}
            <div>
              <div className="inline-flex items-center min-w-0 max-w-full overflow-hidden gap-2 px-3 py-1.5 bg-indigo-500 text-white rounded-full select-none">
                <MapPin
                  className="w-3.5 h-3.5 flex-shrink-0 
                max-sm:w-3 max-sm:h-3"
                  aria-hidden="true"
                />
                <span className="min-w-0 text-xs font-medium truncate">
                  {location}
                </span>
              </div>

              {/* 날짜 */}
              <div className="mt-3 select-none max-sm:hidden">
                <h2 className="text-xl font-bold text-gray-900">{dayOfWeek}</h2>
                <p className="mt-1 text-sm text-gray-600">{date}</p>
              </div>
            </div>

            {/* 기온 + 날씨 아이콘 */}
            <div className="flex items-center gap-3 max-sm:gap-2 max-sm:justify-center">
              <span className="text-5xl font-bold text-gray-900 select-none max-sm:text-3xl md:text-4xl">
                <span className="sr-only">현재 기온 </span>
                {Math.round(currentTemp)}°C
              </span>

              {weatherIcon ? (
                <span
                  className="text-6xl leading-none select-none md:text-5xl max-sm:text-4xl"
                  aria-hidden="true"
                >
                  {WEATHER_ICON_MAP[weatherIcon]}
                </span>
              ) : null}
            </div>
          </div>

          {/* 오른쪽 영역 */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-col sm:justify-center shrink-0">
            <TempMetricBlock label="최저 기온" valueC={minTemp} />
            <TempMetricBlock label="최고 기온" valueC={maxTemp} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
