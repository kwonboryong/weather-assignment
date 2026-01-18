import { useQuery } from "@tanstack/react-query";
import {
  forwardGeocode,
  reverseGeocode,
} from "@/entities/location/model/geocodingApi";
import type { Coords } from "@/shared/lib/getCurrentPosition";

export function useReverseGeocode(coords: Coords | null) {
  return useQuery({
    queryKey: ["reverse-geocode", coords?.lat, coords?.lon],
    queryFn: () => {
      if (!coords) throw new Error("location coords가 없습니다.");
      return reverseGeocode(coords);
    },
    enabled: !!coords,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}

export function useForwardGeocode(placeFull: string | undefined) {
  return useQuery({
    queryKey: ["forward-geocode", placeFull],
    queryFn: () => {
      if (!placeFull) throw new Error("placeFull이 없습니다.");
      return forwardGeocode(placeFull);
    },
    enabled: !!placeFull,
    staleTime: 1000 * 60 * 60 * 24 * 7,
    gcTime: 1000 * 60 * 60 * 24 * 30,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
