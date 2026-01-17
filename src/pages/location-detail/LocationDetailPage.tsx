import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "@/shared/ui/components/BackButton";
import { BookmarkButton } from "@/shared/ui/components/BookmarkButton";

import { HourlyWeatherSection } from "@/entities/weather/ui/HourlyWeatherSection";
import { useForwardGeocode } from "@/features/search-location/model/useForwardGeocode";
import { getTodayLabel } from "@/shared/lib/getTodayLabel";
import {
  useCurrentWeatherByCoords,
  useHourlyWeatherByCoords,
} from "@/entities/weather/model/useWeatherQuery";
import { mapOpenWeatherIcon } from "@/shared/lib/mapOpenWeatherIcon";
import { toHourlyWeatherItems } from "@/shared/lib/toHourlyWeatherItems";
import { useBookmarks } from "@/features/bookmark-location/model/useBookmarks";
import toast from "react-hot-toast";
import { WeatherSummaryCardHome } from "@/entities/weather/ui/WeatherSummaryCardHome";

export default function LocationDetailPage() {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();

  // 오늘 날짜
  const { dayOfWeek, date } = getTodayLabel();

  // 북마크
  const { isBookmarked, toggle } = useBookmarks();
  const placeId = locationId ?? "";
  const bookmarked = placeId ? isBookmarked(placeId) : false;

  const handleToggleBookmark = () => {
    if (!placeId) return;

    const result = toggle(placeId);

    if (result === "limit") {
      toast.error("즐겨찾기는 최대 6개까지 추가할 수 있어요.");
    }
  };

  // 장소명 → 좌표
  const coordsQuery = useForwardGeocode(locationId);
  const coords = coordsQuery.data ?? null;

  // 위치 기반 날씨 조회
  const { weatherQuery } = useCurrentWeatherByCoords(coords);

  // 시간대별 날씨
  const hourlyQuery = useHourlyWeatherByCoords(coords);
  const hourlyWeatherItems = toHourlyWeatherItems(hourlyQuery.data);

  // 장소명 변환
  const placeLabel = locationId ? locationId.replaceAll("-", " ") : "";
  const [region, ...rest] = (placeLabel || "장소 정보").split(" ");
  const detail = rest.join(" ");

  // 예외처리
  const isCoordsPending = coordsQuery.isPending;
  const isNoPlaceInfo = coordsQuery.isSuccess && coords === null;

  return (
    <div className="overflow-x-hidden min-h-dvh bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="flex flex-col w-full max-w-6xl px-4 py-8 mx-auto min-h-dvh">
        <section className="grid flex-none min-h-0 gap-4 sm:gap-6 md:grid-cols-12">
          {/* 뒤로가기 + 북마크 (HomePage 상단 영역과 동일한 느낌) */}
          <div className="flex items-center justify-between md:col-span-12">
            <BackButton onClick={() => navigate(-1)} ariaLabel={"뒤로가기"} />
            <BookmarkButton
              active={bookmarked}
              ariaLabel={bookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              disabled={!placeId}
              onClick={handleToggleBookmark}
            />
          </div>

          {/* 장소명 (HomePage 인사 영역과 동일한 위치/폭) */}
          <div className="mt-2 ml-3 md:mt-5 sm:ml-7 md:col-span-6">
            <h1 className="text-4xl font-extrabold leading-tight select-none text-slate-900 max-sm:text-3xl md:text-5xl">
              <span className="block mb-3 text-indigo-500">{region}</span>
              {detail ? <span className="block">{detail}</span> : null}
            </h1>
          </div>

          {/* 날씨 요약 카드 (HomePage 카드 영역과 동일한 패딩/폭 규칙) */}
          <div className="h-full px-3 py-1 sm:px-6 md:col-span-6">
            <div className="w-full max-w-[720px]">
              {isCoordsPending ? (
                <StateBox text="장소 정보를 불러오는 중..." />
              ) : isNoPlaceInfo ? (
                <StateBox text="해당 장소의 정보가 제공되지 않습니다." />
              ) : weatherQuery.isPending ? (
                <StateBox text="날씨 요약 불러오는 중..." />
              ) : weatherQuery.isError || !weatherQuery.data ? (
                <StateBox text="날씨 요약 정보를 불러올 수 없습니다." />
              ) : (
                <WeatherSummaryCardHome
                  data={{
                    location: placeLabel || "장소 정보",
                    dayOfWeek,
                    date,
                    currentTemp: weatherQuery.data.main.temp,
                    minTemp: weatherQuery.data.main.temp_min,
                    maxTemp: weatherQuery.data.main.temp_max,
                    weatherIcon: mapOpenWeatherIcon(
                      weatherQuery.data.weather?.[0].main
                    ),
                  }}
                />
              )}
            </div>
          </div>
        </section>

        {/* 시간대별 날씨 리스트 (HomePage와 동일한 래퍼 패딩 규칙) */}
        {isCoordsPending || isNoPlaceInfo ? null : (
          <section>
            <div className="h-full px-3 py-1 sm:px-6">
              {hourlyQuery.isPending ? (
                <StateBox text="시간대별 날씨 불러오는 중..." />
              ) : hourlyQuery.isError || !hourlyQuery.data ? (
                <StateBox text="시간대별 날씨 정보를 불러올 수 없습니다." />
              ) : (
                <HourlyWeatherSection items={hourlyWeatherItems} />
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const StateBox = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center w-full h-[220px] rounded-xl bg-white/70 text-slate-700">
    {text}
  </div>
);
