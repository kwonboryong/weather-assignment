import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { SearchBar, BookmarkButton, ViewFallback } from "@/shared/ui";
import type { LocationItem } from "@/shared/ui";

import {
  HourlyWeatherSection,
  WeatherSummaryCardHome,
} from "@/entities/weather/ui";

import { useCurrentCoords } from "@/features/detect-location/model/useCurrentCoordsQuery";
import { usePlaceSearch } from "@/features/search-location/model/usePlaceSearch";
import { useWeatherByCoords } from "@/features/weather-by-coords/model/useWeatherByCoords";

import {
  getTodayLabel,
  getViewState,
  mapOpenWeatherIcon,
  mapHourlyWeatherItems,
  mapGeolocationError,
} from "@/shared/lib";
import { getGreeting } from "@/shared/lib/getGreeting";

export default function HomePage() {
  const navigate = useNavigate();

  const { dayOfWeek, date } = getTodayLabel();
  const greeting = getGreeting();

  // 검색 더보기용 limit
  const [limit, setLimit] = useState(20);

  // 검색 드롭다운
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const [debouncedQuery] = useDebounce(query, 200);

  // 검색 훅(입력값 → 매칭 결과)
  const { results, hasMore } = usePlaceSearch(debouncedQuery, limit);

  // SearchBar가 받는 LocationItem[] 형태로 매핑
  const items: LocationItem[] = useMemo(() => {
    return results.map((p) => ({
      id: p.full,
      title: p.label,
      subtitle: "KR",
    }));
  }, [results]);

  // 현재 위치 좌표
  const coordsQuery = useCurrentCoords();
  const coords = coordsQuery.data ?? null;

  // 좌표 에러
  const geoError = coordsQuery.isError
    ? mapGeolocationError(coordsQuery.error.message)
    : null;

  // 위치 기반 날씨 조회
  const {
    locationQuery,
    currentWeatherQuery,
    hourlyWeatherQuery,
    locationLabel,
  } = useWeatherByCoords(coords, { withHourly: true });

  // 시간대별 날씨
  const hourlyWeatherItems = mapHourlyWeatherItems(hourlyWeatherQuery?.data);

  // Fallback UI - 날씨 조회, 시간대별 날씨
  const geo = {
    coords: coordsQuery.isLoading ? null : coords,
    error: geoError,
  };

  const summaryViewState = getViewState({
    geo,
    queries: [locationQuery, currentWeatherQuery],
    messages: { loading: "날씨 요약 불러오는 중..." },
  });

  const hourlyViewState = getViewState({
    geo,
    queries: hourlyWeatherQuery ? [hourlyWeatherQuery] : [],
    messages: { loading: "시간대별 날씨 불러오는 중..." },
  });

  return (
    <div className="overflow-x-hidden min-h-dvh bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="flex flex-col w-full max-w-6xl px-4 py-8 mx-auto min-h-dvh">
        <section className="grid flex-none min-h-0 gap-4 sm:gap-6 md:grid-cols-12">
          {/* 검색바 + 즐겨찾기 */}
          <div className="flex justify-end md:col-span-12">
            <div className="flex w-full max-w-[540px] items-center gap-3">
              <div role="search" className="relative flex-1">
                <SearchBar
                  value={query}
                  items={items}
                  open={open}
                  onChange={(v) => {
                    setQuery(v);
                    setOpen(Boolean(v.trim()));
                    setLimit((prev) => (prev === 20 ? prev : 20));
                  }}
                  onSelect={(item) => {
                    navigate(`/location/${item.id}`);
                    setOpen(false);
                  }}
                  onClose={() => setOpen(false)}
                  hasMore={hasMore}
                  onLoadMore={() => setLimit((prev) => prev + 20)}
                />
              </div>

              <BookmarkButton
                active
                ariaLabel="즐겨찾기 페이지로 이동"
                onClick={() => navigate("/bookmark")}
              />
            </div>
          </div>

          {/* 인사 */}
          <div className="mt-2 ml-3 md:mt-5 sm:ml-7 md:col-span-6">
            <h1 className="flex flex-col text-4xl font-bold leading-tight select-none md:gap-2 text-slate-900 max-sm:text-3xl md:text-5xl">
              <span className="block text-indigo-400/90">Hi,</span>
              <span className="block">{greeting.prefix}</span>
              <span className="block">{greeting.word}</span>
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
                    currentTemp: currentWeatherQuery.data!.main.temp,
                    minTemp: currentWeatherQuery.data!.main.temp_min,
                    maxTemp: currentWeatherQuery.data!.main.temp_max,
                    weatherIcon: mapOpenWeatherIcon(
                      currentWeatherQuery.data!.weather?.[0]?.main,
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
