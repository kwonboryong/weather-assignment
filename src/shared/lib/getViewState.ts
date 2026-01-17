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

type GeoState = {
  error?: string | null;
  coords?: { lat: number; lon: number } | null;
};

type Params = {
  geo: GeoState;
  queries: Array<UseQueryResult<unknown, Error>>;
  messages?: {
    loading?: string;
    error?: string;
  };
};

export function getViewState({
  geo,
  queries,
  messages = {},
}: Params): ViewState {
  const {
    loading: loadingMessage = MESSAGES.DATA_LOADING,
    error: errorMessage = MESSAGES.DEFAULT_ERROR,
  } = messages;

  // 위치 에러
  if (geo.error) return { type: "error", message: geo.error };

  // 위치 로딩
  if (!geo.coords)
    return { type: "loading", message: MESSAGES.LOCATION_LOADING };

  // 데이터 에러
  const errorQuery = queries.find((q) => q.isError);

  if (errorQuery) {
    return {
      type: "error",
      message: errorQuery.error?.message ?? errorMessage,
    };
  }

  // 데이터 로딩
  if (queries.some((q) => q.isFetching))
    return { type: "loading", message: loadingMessage };

  return { type: "ready" };
}
