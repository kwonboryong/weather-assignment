import { useQuery } from "@tanstack/react-query";
import {
  forwardGeocode,
  reverseGeocode,
} from "@/entities/location/model/geocodingApi";
import type { Coords } from "@/shared/lib/getCurrentPosition";
import { TIME } from "@/shared/lib/query/time";
import { geocodeKeys } from "@/shared/lib/query/query-keys/geocodeKeys";

export function useReverseGeocode(coords: Coords | null) {
  return useQuery({
    queryKey: geocodeKeys.reverse(coords as Coords),
    queryFn: () => {
      if (!coords) throw new Error("location coords가 없습니다.");

      return reverseGeocode(coords);
    },
    enabled: !!coords,
    staleTime: TIME.day,
    gcTime: TIME.day * 7,
  });
}

export function useForwardGeocode(placeFull: string | undefined) {
  return useQuery({
    queryKey: geocodeKeys.forward(placeFull ?? ""),
    queryFn: () => {
      if (!placeFull) throw new Error("placeFull이 없습니다.");

      return forwardGeocode(placeFull);
    },
    enabled: !!placeFull,
    staleTime: TIME.day * 7,
    gcTime: TIME.day * 30,
  });
}
