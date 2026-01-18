import type { Coords } from "@/shared/lib/getCurrentPosition";

export const geocodeKeys = {
  all: ["geocode"] as const,
  reverse: (coords: Coords) =>
    [...geocodeKeys.all, "reverse", coords.lat, coords.lon] as const,
  forward: (placeFull: string) =>
    [...geocodeKeys.all, "forward", placeFull] as const,
};
