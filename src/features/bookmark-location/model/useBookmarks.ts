import { bookmarkKeys } from "@/shared/lib/query/query-keys/bookmarkKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

const STORAGE_KEY = "weatherapp:bookmarks";
const MAX_BOOKMARKS = 6;

type ToggleType = "added" | "removed" | "limit";

function readBookmarks(): string[] {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeBookmarks(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useBookmarks() {
  const queryClient = useQueryClient();
  const [ids, setIds] = useState<string[]>(() => readBookmarks());

  const isBookmarked = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string): ToggleType => {
      const current = Array.from(new Set(readBookmarks()));

      if (current.includes(id)) {
        const next = current.filter((x) => x !== id);

        setIds(next);
        writeBookmarks(next);

        queryClient.removeQueries({ queryKey: bookmarkKeys.summary(id) });

        return "removed";
      }

      if (current.length >= MAX_BOOKMARKS) {
        return "limit";
      }

      const next = [...current, id];

      setIds(next);
      writeBookmarks(next);

      queryClient.invalidateQueries({ queryKey: bookmarkKeys.summary(id) });

      return "added";
    },
    [queryClient],
  );

  const remove = useCallback(
    (id: string) => {
      const current = readBookmarks();
      const next = current.filter((x) => x !== id);

      setIds(next);
      writeBookmarks(next);

      queryClient.removeQueries({ queryKey: bookmarkKeys.summary(id) });
    },
    [queryClient],
  );

  return { ids, isBookmarked, toggle, remove };
}
