import { SearchBar } from "@/shared/ui/components/SearchBar";
import type { LocationItem } from "@/shared/ui/components/LocationDropdown";
import { BookmarkButton } from "@/shared/ui/components/BookmarkButton";
import { WeatherSummaryCard } from "@/entities/weather/ui/WeatherSummaryCard";
import { HourlyWeatherSection } from "@/entities/weather/ui/HourlyWeatherSection";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDetectLocation } from "@/features/detect-location/model/useDetectLocation";
import { useCurrentWeatherByCoords } from "@/entities/weather/model/useWeatherQuery";
import { mapOpenWeatherIcon } from "@/shared/lib/mapOpenWeatherIcon";
import { getTodayLabel } from "@/shared/lib/getTodayLabel";
import { getHomeViewState } from "@/pages/home/model/getHomeViewState";
import { HomeViewFallback } from "./ui/HomeViewFallback";

export default function HomePage() {
  const navigate = useNavigate();

  // 드롭다운
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // 드롭다운 더미 데이터
  const items: LocationItem[] = useMemo(() => {
    const all = [
      { id: "1", title: "서울특별시 종로구", subtitle: "KR" },
      { id: "2", title: "서울특별시 강남구", subtitle: "KR" },
      { id: "3", title: "부산광역시 해운대구", subtitle: "KR" },
    ];

    const q = query.trim();
    if (!q) return [];
    return all.filter((x) => x.title.includes(q));
  }, [query]);

  // 현재 위치 좌표
  const { coords, error: geoError } = useDetectLocation();

  // 위치 기반 날씨 조회
  const { locationQuery, weatherQuery, locationLabel } =
    useCurrentWeatherByCoords(coords);

  const weather = weatherQuery.data;
  // console.log(weather);

  // 시간대별 날씨 더미 데이터
  const hourlyWeatherItems = Array.from({ length: 8 }).map((_, i) => ({
    hour: `${17 + i}시`,
    temp: "28°C",
    weatherIcon: "sun" as const,
  }));

  // 오늘 요일/날짜
  const { dayOfWeek, date } = getTodayLabel();

  // 위치 감지 - 로딩 UI
  const viewState = getHomeViewState({
    geoError,
    coords,
    locationQuery,
    weatherQuery,
  });

  return (
    <div className="overflow-hidden h-dvh bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="flex flex-col w-full max-w-6xl px-4 py-8 mx-auto h-dvh">
        <section className="grid flex-none min-h-0 gap-10 md:grid-cols-12">
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
          <div className="mt-5 ml-7 md:col-span-6">
            <h1 className="text-4xl font-bold leading-tight select-none text-slate-900 md:text-6xl">
              <span className="block text-indigo-400/90">Hi,</span>
              <span className="block">Good</span>
              <span className="block">Morning</span>
            </h1>
          </div>

          {/* 날씨 요약 카드 */}
          <div className="flex justify-end md:col-span-6">
            <div className="w-full max-w-[720px]">
              {viewState.type !== "ready" ? (
                <HomeViewFallback state={viewState} />
              ) : (
                <WeatherSummaryCard
                  variant="default"
                  data={{
                    location: locationLabel,
                    dayOfWeek,
                    date,
                    currentTemp: weather.main.temp,
                    minTemp: weather.main.temp_min,
                    maxTemp: weather.main.temp_max,
                    weatherIcon: mapOpenWeatherIcon(weather.weather?.[0]?.main),
                  }}
                />
              )}
            </div>
          </div>
        </section>

        {/* 시간대별 날씨 리스트 */}
        <section>
          <div className="h-full px-6 py-1">
            <HourlyWeatherSection items={hourlyWeatherItems} />
          </div>
        </section>
      </main>
    </div>
  );
}
