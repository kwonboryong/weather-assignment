// 날씨 아이콘
export type WeatherIconKey =
  | "sun"
  | "cloud"
  | "rain"
  | "snow"
  | "thunder"
  | "fog"
  | "wind";

// 공통 날씨 정보
export type WeatherSummaryBaseData = {
  location: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  weatherIcon?: WeatherIconKey;
};

// 메인(WeatherSummaryCard) - 오늘 날짜
export type WeatherSummaryDefaultData = WeatherSummaryBaseData & {
  dayOfWeek: string;
  date: string;
};

// 메인(WeatherSummaryCard)
export interface DefaultVariantProps {
  variant: "default";
  className?: string;
  data: WeatherSummaryDefaultData;
}

// 즐겨찾기(WeatherSummaryCard)
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

// 시간대별 날씨 정보
export type HourlyWeatherItem = {
  hour: string;
  temp: string;
  weatherIcon?: WeatherIconKey;
};
