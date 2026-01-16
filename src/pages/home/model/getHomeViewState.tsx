import type { UseQueryResult } from "@tanstack/react-query";

const MESSAGES = {
  LOCATION_LOADING: "현재 위치 확인 중...",
  DATA_LOADING: "불러오는 중...",
  DEFAULT_ERROR: "에러가 발생했어요.",
} as const;

export type ViewState =
  | { type: "error"; message: string }
  | { type: "loading"; message: string }
  | { type: "ready" };

type Params = {
  geoError?: string | null;
  coords?: { lat: number; lon: number } | null;
  locationQuery: UseQueryResult<unknown, Error>;
  weatherQuery: UseQueryResult<unknown, Error>;
};

export function getHomeViewState({
  geoError,
  coords,
  locationQuery,
  weatherQuery,
}: Params): ViewState {
  if (geoError) return { type: "error", message: geoError };

  if (!coords) return { type: "loading", message: MESSAGES.LOCATION_LOADING };

  if (locationQuery.isLoading || weatherQuery.isLoading)
    return { type: "loading", message: MESSAGES.DATA_LOADING };

  if (locationQuery.isError)
    return {
      type: "error",
      message: locationQuery.error?.message ?? MESSAGES.DEFAULT_ERROR,
    };

  if (weatherQuery.isError)
    return {
      type: "error",
      message: weatherQuery.error?.message ?? MESSAGES.DEFAULT_ERROR,
    };

  return { type: "ready" };
}
