// 날씨 아이콘
export type WeatherIconKey =
  | "sun"
  | "cloud"
  | "rain"
  | "snow"
  | "thunder"
  | "fog"
  | "wind";

// 공통 데이터
export type WeatherSummaryBaseData = {
  location: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  weatherIcon?: WeatherIconKey;
};

// 메인 데이터
export type WeatherSummaryDefaultData = WeatherSummaryBaseData & {
  dayOfWeek: string;
  date: string;
};

// 메인
export interface DefaultVariantProps {
  className?: string;
  variant: "default";
  data: WeatherSummaryDefaultData;
}

// 즐겨찾기
export interface FavoriteVariantProps {
  variant: "favorite";
  className?: string;
  data: WeatherSummaryBaseData;
  onClick: () => void;
  onRemove: () => void;
}

export type WeatherSummaryCardProps =
  | DefaultVariantProps
  | FavoriteVariantProps;
