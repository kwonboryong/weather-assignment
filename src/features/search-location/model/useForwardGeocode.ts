import { useQuery } from "@tanstack/react-query";
import { forwardGeocode } from "@/shared/lib/geocoding/geocodingApi";

export function useForwardGeocode(placeFull: string | undefined) {
  return useQuery({
    queryKey: ["forward-geocode", placeFull],
    queryFn: () => forwardGeocode(placeFull ?? ""),
    enabled: !!placeFull,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
}
