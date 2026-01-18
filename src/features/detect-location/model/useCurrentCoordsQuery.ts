import { useQuery } from "@tanstack/react-query";
import { getCurrentPosition } from "@/shared/lib/getCurrentPosition";
import { TIME } from "@/shared/lib/query/time";
import type { Coords } from "@/shared/lib/getCurrentPosition";

export function useCurrentCoords() {
  return useQuery<Coords, Error>({
    queryKey: ["geo", "current-coords"],
    queryFn: getCurrentPosition,
    staleTime: TIME.hour,
    gcTime: TIME.day * 7,
  });
}
