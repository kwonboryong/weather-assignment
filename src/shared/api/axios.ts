import axios from "axios";

const baseURL = import.meta.env.VITE_OPENWEATHER_BASE_URL;
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const units = import.meta.env.VITE_OPENWEATHER_UNITS ?? "metric";
const lang = import.meta.env.VITE_OPENWEATHER_LANG ?? "kr";

if (import.meta.env.DEV && !apiKey) {
  console.warn("[OpenWeather] VITE_OPENWEATHER_API_KEY is missing");
}

export const instance = axios.create({
  baseURL,
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

// 요청
instance.interceptors.request.use((config) => {
  config.params = {
    ...(config.params ?? {}),
    appid: apiKey,
    units,
    lang,
  };
  return config;
});

// 응답
instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.message ??
      error?.message ??
      "요청 중 오류가 발생했습니다.";
    return Promise.reject(new Error(message));
  }
);
