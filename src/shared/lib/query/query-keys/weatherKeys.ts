import type { Coords } from "@/shared/lib/getCurrentPosition";

export const weatherKeys = {
  all: ["weather"] as const,
  current: (coords: Coords) =>
    [...weatherKeys.all, "current", coords.lat, coords.lon] as const,
  hourly: (coords: Coords) =>
    [...weatherKeys.all, "hourly", coords.lat, coords.lon] as const,
};
