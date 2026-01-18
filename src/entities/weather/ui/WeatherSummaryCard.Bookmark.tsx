import { Card, CardContent } from "@/shared/ui/shadcn/card";
import { MapPin, Pencil, X } from "lucide-react";
import { WEATHER_ICON_MAP } from "@/entities/weather/ui/weatherIconMap";
import type { WeatherSummaryBaseData } from "@/entities/weather/model/types";
import { TempMetricBlock } from "@/entities/weather/ui/TempMetricBlock";
import { CARD_SURFACE } from "./WeatherSummaryCard.Home";

type Props = {
  className?: string;
  data: WeatherSummaryBaseData;
  alias?: string;

  onClick: () => void;
  onRemove: () => void;
  onEditAlias?: () => void;
};

export function WeatherSummaryCardBookmark({
  className = "",
  data,
  alias,
  onClick,
  onRemove,
  onEditAlias,
}: Props) {
  const { location, currentTemp, minTemp, maxTemp, weatherIcon } = data;

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove();
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEditAlias?.();
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`${alias ?? location} 상세 페이지로 이동`}
      className={`
      w-full sm:max-w-[320px]
      transition-all duration-200 relative
      cursor-pointer hover:shadow-lg hover:scale-[1.0]
       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white
      ${CARD_SURFACE}
      ${className}
    `}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* 즐겨찾기 삭제 */}
      <button
        type="button"
        onClick={handleRemoveClick}
        className="absolute z-10 flex items-center justify-center w-6 h-6 text-white transition-colors duration-200 rounded-full top-3 right-3 bg-gray-900/60 hover:bg-red-500"
        aria-label="즐겨찾기 삭제"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>

      <CardContent className="p-5 max-sm:p-4 h-[180px] max-sm:h-[160px]">
        <div className="grid h-full grid-cols-[minmax(0,1fr)_auto] gap-3 max-sm:gap-2">
          {/* 왼쪽 영역 */}
          <div className="flex flex-col h-full min-w-0 md:justify-between">
            {/* 위치 */}
            <div className="h-[72px] max-sm:h-[64px]">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                <div className="min-w-0">
                  <div className="inline-flex items-center min-w-0 max-w-full overflow-hidden gap-2 px-3 py-1.5 bg-indigo-500 text-white rounded-full">
                    <MapPin
                      className="w-3.5 h-3.5 max-sm:w-3 max-sm:h-3 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 text-xs font-medium truncate">
                      {alias ?? location}
                    </span>
                  </div>

                  {/* 별칭이 있을 때만 원래 위치명 표시 */}
                  {alias ? (
                    <p className="max-w-full mt-2 text-xs truncate text-slate-600">
                      {location}
                    </p>
                  ) : null}
                </div>

                {/* 별칭 수정 */}
                <button
                  type="button"
                  aria-label="별칭 수정"
                  onClick={handleEditClick}
                  className="flex items-center justify-center flex-shrink-0 w-6 h-6 transition-colors rounded-full bg-gray-900/10 hover:bg-gray-900/20"
                >
                  <Pencil
                    className="w-3.5 h-3.5 text-gray-700"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* 기온 + 날씨 아이콘 */}
            <div className="flex items-center gap-3 max-sm:gap-2 max-sm:mt-4">
              <span className="text-4xl font-bold text-gray-900 max-sm:text-3xl">
                <span className="sr-only">현재 기온 </span>
                {Math.round(currentTemp)}°C
              </span>

              {weatherIcon ? (
                <span
                  className="text-5xl leading-none select-none max-sm:text-4xl"
                  aria-hidden="true"
                >
                  {WEATHER_ICON_MAP[weatherIcon]}
                </span>
              ) : null}
            </div>
          </div>

          {/* 오른쪽 영역 */}
          <div className="flex flex-col justify-center gap-2 shrink-0">
            <TempMetricBlock
              size="compact"
              label="최저 기온"
              valueC={minTemp}
            />
            <TempMetricBlock
              size="compact"
              label="최고 기온"
              valueC={maxTemp}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
