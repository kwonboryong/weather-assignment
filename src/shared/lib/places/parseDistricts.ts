import type { PlaceItem } from "@/shared/lib/places/types";

export function parseDistricts(raw: string[]): PlaceItem[] {
  return raw
    .map((full) => {
      const parts = full.split("-").filter(Boolean);
      const label = parts.join(" ");

      return {
        id: full,
        full,
        label,
        parts,
      };
    })
    .filter((item) => item.parts.length > 0);
}
