import * as React from "react";
import { Card, CardContent } from "@/shared/ui/shadcn/card";
import { MapPin, Pencil, X } from "lucide-react";
import type { WeatherSummaryCardProps } from "@/entities/weather/model/types";
import { WEATHER_ICON_MAP } from "@/entities/weather/ui/weatherIcons";

const round = (n: number) => Math.round(n);

export function WeatherSummaryCard(props: WeatherSummaryCardProps) {
  const { variant, className = "" } = props;
  const { location, currentTemp, minTemp, maxTemp, weatherIcon } = props.data;

  const isFavorite = variant === "favorite";

  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (variant === "favorite") props.onRemove();
  };

  const handleCardClick = () => {
    if (variant === "favorite") props.onClick();
  };

  // 별칭 수정
  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (variant === "favorite") props.onEditAlias?.();
  };

  return (
    <Card
      className={`
        w-full 
        ${isFavorite ? "max-w-[320px]" : "max-w-[500px]"}
        bg-white backdrop-blur-sm
        border-none shadow-lg
        transition-all duration-200 
        relative
       ${isFavorite ? "cursor-pointer hover:shadow-xl hover:scale-[1.0]" : ""}
        ${className}
      `}
      onClick={isFavorite ? handleCardClick : undefined}
    >
      {/* 즐겨찾기 삭제 */}
      {isFavorite && (
        <button
          type="button"
          onClick={handleRemoveClick}
          className="absolute z-10 flex items-center justify-center w-6 h-6 text-white transition-colors duration-200 rounded-full top-3 right-3 bg-gray-900/60 hover:bg-red-500"
          aria-label="즐겨찾기 삭제"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <CardContent className={isFavorite ? "p-5" : "p-6"}>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          {/* 왼쪽 영역 */}
          <div className={`flex flex-col ${isFavorite ? "gap-12" : "gap-2"}`}>
            {/* 위치 */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500 text-white rounded-full ${
                    isFavorite ? "max-w-[180px]" : "w-fit"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span
                    className={`text-xs font-medium ${
                      isFavorite ? "truncate min-w-0" : ""
                    }`}
                  >
                    {isFavorite ? (props.alias ?? location) : location}
                  </span>
                </div>

                {/* 별칭이 있으면 -> 원래 위치명 추가 */}
                {isFavorite && props.alias ? (
                  <p className="mt-2 text-[11px] text-slate-500 truncate max-w-[180px]">
                    {location}
                  </p>
                ) : null}
              </div>

              {/* 별칭 수정 */}
              {isFavorite ? (
                <button
                  type="button"
                  aria-label="별칭 수정"
                  onClick={handleEditClick}
                  className="flex items-center justify-center w-6 h-6 transition-colors rounded-full bg-gray-900/10 hover:bg-gray-900/20"
                >
                  <Pencil className="w-3.5 h-3.5 text-gray-700" />
                </button>
              ) : null}
            </div>

            {/* 날짜 */}
            {variant === "default" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {props.data.dayOfWeek}
                </h2>
                <p className="mt-1 text-sm text-gray-600">{props.data.date}</p>
              </div>
            )}

            {/* 현재 기온 + 날씨 아이콘 */}
            <div className="flex items-center gap-3">
              <span
                className={`font-bold text-gray-900 ${
                  isFavorite ? "text-4xl" : "text-5xl"
                }`}
              >
                {round(currentTemp)}°C
              </span>

              {weatherIcon ? (
                <span
                  className={
                    isFavorite
                      ? "text-5xl leading-none select-none"
                      : "text-6xl leading-none select-none"
                  }
                  aria-hidden
                >
                  {WEATHER_ICON_MAP[weatherIcon]}
                </span>
              ) : null}
            </div>
          </div>

          {/* 오른쪽 영역*/}
          <div className="flex flex-col justify-center gap-2">
            <TempMetricBlock
              isCompact={isFavorite}
              label="최저 기온"
              valueC={minTemp}
            />
            <TempMetricBlock
              isCompact={isFavorite}
              label="최고 기온"
              valueC={maxTemp}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 최저/최고 기온 블록
function TempMetricBlock({
  label,
  valueC,
  isCompact,
}: {
  label: string;
  valueC: number;
  isCompact: boolean;
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center 
        bg-indigo-500 text-white rounded-xl
        ${isCompact ? "px-4 py-2 min-w-[80px]" : "px-6 py-4 min-w-[120px]"}
      `}
    >
      <span
        className={`font-medium mb-0.5 ${
          isCompact ? "text-[10px]" : "text-xs"
        }`}
      >
        {label}
      </span>
      <span className={`font-bold ${isCompact ? "text-base" : "text-2xl"}`}>
        {round(valueC)}°C
      </span>
    </div>
  );
}
