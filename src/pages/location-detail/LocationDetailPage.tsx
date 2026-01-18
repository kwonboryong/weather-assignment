import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { BackButton, BookmarkButton, ViewFallback } from "@/shared/ui";
import {
  HourlyWeatherSection,
  WeatherSummaryCardHome,
} from "@/entities/weather/ui";

import {
  getViewState,
  type ViewState,
  getTodayLabel,
  mapOpenWeatherIcon,
  mapHourlyWeatherItems,
} from "@/shared/lib";

import { useForwardGeocode } from "@/entities/location/model/useGeocodeQueries";
import { useBookmarks } from "@/features/bookmark-location/model/useBookmarks";
import { useWeatherByCoords } from "@/features/weather-by-coords/model/useWeatherByCoords";

export default function LocationDetailPage() {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();

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
  const { currentWeatherQuery, hourlyWeatherQuery } = useWeatherByCoords(
    coords,
    {
      withHourly: true,
    },
  );

  // 시간대별 날씨
  const hourlyWeatherItems = mapHourlyWeatherItems(hourlyWeatherQuery?.data);

  // 장소명 변환
  const placeLabel = locationId ? locationId.replaceAll("-", " ") : "";
  const [region, ...rest] = (placeLabel || "장소 정보").split(" ");
  const detail = rest.join(" ");

  // 예외 처리
  const isNoPlaceInfo = coordsQuery.isSuccess && coords === null;

  // Fallback UI - 날씨 조회, 시간대별 날씨
  const geo = {
    coords,
    error: coordsQuery.isError ? "장소 정보를 불러올 수 없습니다." : null,
  };

  const noPlaceState: ViewState = {
    type: "error",
    message: "해당 장소의 정보가 제공되지 않습니다.",
  };

  const summaryViewState = isNoPlaceInfo
    ? noPlaceState
    : getViewState({
        geo,
        queries: [coordsQuery, currentWeatherQuery],
        messages: { loading: "날씨 요약 불러오는 중..." },
      });

  const hourlyViewState = isNoPlaceInfo
    ? noPlaceState
    : getViewState({
        geo,
        queries: [coordsQuery, hourlyWeatherQuery!],
        messages: { loading: "시간대별 날씨 불러오는 중..." },
      });

  return (
    <div className="overflow-x-hidden min-h-dvh bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="flex flex-col w-full max-w-6xl px-4 py-8 mx-auto min-h-dvh">
        <section className="grid flex-none min-h-0 gap-4 sm:gap-6 md:grid-cols-12">
          {/* 뒤로가기 + 북마크 */}
          <div className="flex items-center justify-between md:col-span-12">
            <BackButton onClick={() => navigate(-1)} ariaLabel={"뒤로 가기"} />
            <BookmarkButton
              active={bookmarked}
              mode="toggle"
              ariaLabel={bookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              disabled={!placeId}
              onClick={handleToggleBookmark}
            />
          </div>

          {/* 장소명 */}
          <div className="mt-2 ml-3 md:mt-5 sm:ml-7 md:col-span-6">
            <h1 className="text-4xl font-extrabold leading-tight select-none text-slate-900 max-sm:text-3xl md:text-5xl">
              <span className="block mb-3 text-indigo-500">{region}</span>
              {detail ? <span className="block">{detail}</span> : null}
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
                    location: placeLabel || "장소 정보",
                    dayOfWeek,
                    date,
                    currentTemp: currentWeatherQuery.data!.main.temp,
                    minTemp: currentWeatherQuery.data!.main.temp_min,
                    maxTemp: currentWeatherQuery.data!.main.temp_max,
                    weatherIcon: mapOpenWeatherIcon(
                      currentWeatherQuery.data?.weather?.[0].main,
                    ),
                  }}
                />
              )}
            </div>
          </div>
        </section>

        {/* 시간대별 날씨 리스트 */}
        {isNoPlaceInfo ? null : (
          <section aria-label="시간대별 날씨">
            <div className="h-full px-3 py-1 sm:px-6">
              {hourlyViewState.type !== "ready" ? (
                <ViewFallback state={hourlyViewState} />
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
