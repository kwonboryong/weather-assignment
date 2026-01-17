import type {
  CurrentWeatherResponse,
  HourlyWeatherResponse,
} from "@/entities/weather/model/types";
import type { ReverseGeoItem } from "@/entities/location/model/geocodingApi";
import {
  getViewState,
  type GeoState,
  type ViewState,
} from "@/shared/lib/getViewState";
import type { UseQueryResult } from "@tanstack/react-query";

type Params = {
  geo: GeoState;
  locationQuery: UseQueryResult<ReverseGeoItem | null, Error>;
  weatherQuery: UseQueryResult<CurrentWeatherResponse, Error>;
  hourlyQuery: UseQueryResult<HourlyWeatherResponse, Error>;
};

export function getWeatherViewStates({
  geo,
  locationQuery,
  weatherQuery,
  hourlyQuery,
}: Params): {
  summaryViewState: ViewState;
  hourlyViewState: ViewState;
} {
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

  return { summaryViewState, hourlyViewState };
}
