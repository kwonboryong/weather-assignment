import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "@/shared/ui/components/BackButton";
import { BookmarkButton } from "@/shared/ui/components/BookmarkButton";
import { WeatherSummaryCard } from "@/entities/weather/ui/WeatherSummaryCard";
import { HourlyWeatherSection } from "@/entities/weather/ui/HourlyWeatherSection";
import { useForwardGeocode } from "@/features/search-location/model/useForwardGeocode";
import { getTodayLabel } from "@/shared/lib/getTodayLabel";
import {
  useCurrentWeatherByCoords,
  useHourlyWeatherByCoords,
} from "@/entities/weather/model/useWeatherQuery";
import { mapOpenWeatherIcon } from "@/shared/lib/mapOpenWeatherIcon";
import { toHourlyWeatherItems } from "@/shared/lib/toHourlyWeatherItems";

export default function LocationDetailPage() {
  const navigate = useNavigate();
  const { locationId } = useParams<{ locationId: string }>();

  // 오늘 날짜
  const { dayOfWeek, date } = getTodayLabel();

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
    <div className="overflow-hidden h-dvh bg-gradient-to-br from-indigo-50 to-purple-50">
      <main className="flex flex-col w-full max-w-6xl px-4 py-8 mx-auto h-dvh">
        <section className="grid flex-none min-h-0 gap-10 md:grid-cols-12">
          {/* 뒤로가기 + 북마크 */}
          <div className="flex items-center justify-between md:col-span-12">
            <BackButton onClick={() => navigate(-1)} ariaLabel={"뒤로가기"} />
            <BookmarkButton
              active
              ariaLabel="즐겨찾기 페이지로 이동"
              onClick={() => navigate("/bookmark")}
            />
          </div>

          {/* 장소명 */}
          <div className="mt-5 ml-7 md:col-span-6">
            <h1 className="text-4xl font-extrabold leading-tight select-none text-slate-900 md:text-6xl">
              <span className="block mb-5 text-indigo-500">{region}</span>
              {detail ? <span className="block">{detail}</span> : null}
            </h1>
          </div>

          {/* 날씨 요약 카드 */}
          <div className="flex justify-end md:col-span-6">
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
                <WeatherSummaryCard
                  variant="default"
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

        {/* 시간대별 날씨 리스트 */}
        {isCoordsPending || isNoPlaceInfo ? null : (
          <section>
            <div className="h-full px-6 py-1">
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
