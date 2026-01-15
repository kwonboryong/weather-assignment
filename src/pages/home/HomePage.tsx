import { WeatherSummaryCard } from "@/entities/weather/ui/WeatherSummaryCard";
import { HourlyWeatherSection } from "@/entities/weather/ui/HourlyWeatherSection";
import { SearchBar } from "@/shared/ui/components/SearchBar";
import { useMemo, useState } from "react";
import type { LocationItem } from "@/shared/ui/components/LocationDropdown";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const hourlyWeatherItems = Array.from({ length: 8 }).map((_, i) => ({
    hour: `${17 + i}시`,
    temp: "28°C",
    weatherIcon: "sun" as const,
  }));

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

  return (
    <div className="bg-slate-50 min-h-dvh">
      {/* 헤더 영역 */}
      <header className="sticky top-0 z-10 border-b bg-slate-50/80 backdrop-blur">
        <div className="flex items-center justify-between w-full max-w-6xl gap-3 px-4 py-3 mx-auto">
          {/* 검색바 */}
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();

              if (items[0]) {
                navigate(`/location/${items[0].id}`);
                setOpen(false);
              }
            }}
            className="relative w-full max-w-xl"
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

          {/* 즐겨찾기 */}
          {/* <BookmarkToggleButton /> */}
        </div>
      </header>

      <main className="w-full max-w-6xl px-4 py-6 mx-auto bg-red-300">
        {/* 미들 영역 */}
        <section
          aria-labelledby="home-overview-title"
          className="grid gap-6 md:grid-cols-12"
        >
          {/* 인사 */}
          <div className="md:col-span-5">
            <h1
              id="home-overview-title"
              className="text-3xl font-semibold leading-tight text-slate-900 md:text-5xl"
            >
              <span className="block text-slate-500">Hi,</span>
              <span className="block">Good Morning</span>
            </h1>
          </div>

          {/* 날씨 정보 카드 */}
          <div className="md:col-span-7">
            <article className="">
              <WeatherSummaryCard
                variant="default"
                data={{
                  location: "Dhaka, Bangladesh",
                  dayOfWeek: "Sunday",
                  date: "04 Aug, 2024",
                  weatherIcon: "rain",
                  currentTemp: 28,
                  minTemp: 22,
                  maxTemp: 32,
                }}
              />
            </article>
          </div>
        </section>

        {/* 시간대별 날씨 리스트 */}
        <HourlyWeatherSection items={hourlyWeatherItems} />
      </main>
    </div>
  );
}
