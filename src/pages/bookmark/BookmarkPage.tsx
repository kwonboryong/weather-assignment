import { useNavigate } from "react-router-dom";
import { BackButton } from "@/shared/ui/components/BackButton";
import type { WeatherSummaryBaseData } from "@/entities/weather/model/types";
import { WeatherSummaryCard } from "@/entities/weather/ui/WeatherSummaryCard";
import { useBookmarks } from "@/features/bookmark-location/model/useBookmarks";

// 북마크 location -> 카드에 넣을 data를 만드는 함수(추후 교체)
// 캐시/쿼리에서 해당 location의 current/min/max/icon 가져오기
function getSummaryByLocation(location: string): WeatherSummaryBaseData {
  return {
    location,
    currentTemp: 28,
    minTemp: 24,
    maxTemp: 30,
    weatherIcon: "rain",
  };
}

export default function BookmarkPage() {
  const navigate = useNavigate();
  const { ids, remove } = useBookmarks();

  // 중복이 들어와도 1번만 렌더링
  const uniqueIds = Array.from(new Set(ids));
  const visibleIds = uniqueIds.slice(0, 6);

  // 예외 처리
  const isEmpty = visibleIds.length === 0;

  return (
    <div className="overflow-hidden h-dvh bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="w-full max-w-6xl px-4 py-6 mx-auto sm:px-6 sm:py-10">
        {/* 뒤로가기 */}
        <div className="mb-6 sm:mb-10">
          <BackButton ariaLabel="뒤로가기" onClick={() => navigate(-1)} />
        </div>

        {/* 페이지 제목 */}
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-indigo-500 select-none sm:mb-10 sm:text-[40px]">
          즐겨찾기
        </h1>

        {/* 즐겨찾기 카드 그리드 */}
        {isEmpty ? (
          <p className="py-10 text-sm text-center text-gray-500">
            아직 즐겨찾기한 지역이 없어요.
            <br />
            홈에서 지역을 검색하고, 즐겨찾기에 추가해보세요.
          </p>
        ) : (
          <section className="grid grid-cols-1 gap-4 justify-items-center sm:gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-8">
            {visibleIds.map((location) => (
              <WeatherSummaryCard
                key={location}
                variant="favorite"
                data={getSummaryByLocation(location)}
                onClick={() =>
                  navigate(`/location/${encodeURIComponent(location)}`)
                }
                onRemove={() => remove(location)}
              />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
