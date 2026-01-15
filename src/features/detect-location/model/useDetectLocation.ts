import { useEffect, useState } from "react";
import {
  getCurrentPosition,
  type Coords,
} from "@/shared/lib/getCurrentPosition";

export function useDetectLocation() {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCurrentPosition()
      .then((c) => {
        setCoords(c);
      })
      .catch((e: Error) => {
        setError(e.message);
      });
  }, []);

  return { coords, error };
}
