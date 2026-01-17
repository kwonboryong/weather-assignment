import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchBar, BookmarkButton, ViewFallback } from "@/shared/ui";
import type { LocationItem } from "@/shared/ui";

import {
  HourlyWeatherSection,
  WeatherSummaryCardHome,
} from "@/entities/weather/ui";
import {
  useCurrentWeatherByCoords,
  useHourlyWeatherByCoords,
} from "@/entities/weather/model";

import { useDetectLocation } from "@/features/detect-location/model/useDetectLocation";
import { usePlaceSearch } from "@/features/search-location/model/usePlaceSearch";

import {
  getTodayLabel,
  getViewState,
  mapOpenWeatherIcon,
  mapHourlyWeatherItems,
} from "@/shared/lib";

export default function HomePage() {
  const navigate = useNavigate();

  const { dayOfWeek, date } = getTodayLabel();

  // 검색 드롭다운
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // 검색 훅(입력값 → 매칭 결과)
  const { results } = usePlaceSearch(query);

  // SearchBar가 받는 LocationItem[] 형태로 매핑
  const items: LocationItem[] = useMemo(() => {
    return results.map((p) => ({
      id: p.full,
      title: p.label,
      subtitle: "KR",
    }));
  }, [results]);

  // 현재 위치 좌표
  const { coords, error: geoError } = useDetectLocation();

  // 위치 기반 날씨 조회
  const { locationQuery, weatherQuery, locationLabel } =
    useCurrentWeatherByCoords(coords);

  // 시간대별 날씨
  const hourlyQuery = useHourlyWeatherByCoords(coords);
  const hourlyWeatherItems = mapHourlyWeatherItems(hourlyQuery.data);

  // Fallback UI - 날씨 조회, 시간대별 날씨
  const geo = { coords, error: geoError };

  const summaryViewState = getViewState({
    geo,
    queries: [locationQuery, weatherQuery],
    messages: { loading: "날씨 요약 불러오는 중..." },
  });

  const hourlyViewState = getViewState({
    geo,
    queries: [hourlyQuery],
    messages: { loading: "시간대별 날씨 불러오는 중..." },
  });

  return (
    <div className="overflow-x-hidden min-h-dvh bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="flex flex-col w-full max-w-6xl px-4 py-8 mx-auto min-h-dvh">
        <section className="grid flex-none min-h-0 gap-4 sm:gap-6 md:grid-cols-12">
          {/* 검색바 + 즐겨찾기 */}
          <div className="flex justify-end md:col-span-12">
            <div className="flex w-full max-w-[540px] items-center gap-3">
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (items[0]) {
                    navigate(`/location/${items[0].id}`);
                    setOpen(false);
                  }
                }}
                className="relative flex-1"
              >
                <SearchBar
                  value={query}
                  items={items}
                  open={open}
                  onChange={(v) => {
                    setQuery(v);
                    setOpen(Boolean(v.trim()));
                  }}
                  onSelect={(item) => {
                    navigate(`/location/${item.id}`);
                    setOpen(false);
                  }}
                  onClose={() => setOpen(false)}
                />
              </form>

              <BookmarkButton
                active
                ariaLabel="즐겨찾기 페이지로 이동"
                onClick={() => navigate("/bookmark")}
              />
            </div>
          </div>

          {/* 인사 */}
          <div className="mt-2 ml-3 md:mt-5 sm:ml-7 md:col-span-6">
            <h1 className="text-4xl font-bold leading-tight select-none text-slate-900 max-sm:text-3xl md:text-5xl">
              <span className="block text-indigo-400/90">Hi,</span>
              <span className="block">Good</span>
              <span className="block">Morning</span>
            </h1>
          </div>

          {/* 날씨 요약 카드 */}
          <div className="h-full px-3 py-1 sm:px-6 md:col-span-6">
            <div className="w-full max-w-[720px]">
              {summaryViewState.type !== "ready" ? (
                <ViewFallback state={summaryViewState} />
              ) : (
                <WeatherSummaryCardHome
                  data={{
                    location: locationLabel,
                    dayOfWeek,
                    date,
                    currentTemp: weatherQuery.data!.main.temp,
                    minTemp: weatherQuery.data!.main.temp_min,
                    maxTemp: weatherQuery.data!.main.temp_max,
                    weatherIcon: mapOpenWeatherIcon(
                      weatherQuery.data!.weather?.[0]?.main,
                    ),
                  }}
                />
              )}
            </div>
          </div>
        </section>

        {/* 시간대별 날씨 리스트 */}
        <section>
          <div className="h-full px-3 py-1 sm:px-6">
            {hourlyViewState.type !== "ready" ? (
              <ViewFallback state={hourlyViewState} />
            ) : (
              <HourlyWeatherSection items={hourlyWeatherItems} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
