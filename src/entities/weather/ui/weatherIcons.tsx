import * as React from "react";
import type { WeatherIconKey } from "@/entities/weather/model/types";

export const WEATHER_ICON_MAP: Record<WeatherIconKey, React.ReactNode> = {
  sun: "☀️",
  cloud: "☁️",
  rain: "🌧️",
  snow: "❄️",
  thunder: "⛈️",
  fog: "🌫️",
  wind: "💨",
};
