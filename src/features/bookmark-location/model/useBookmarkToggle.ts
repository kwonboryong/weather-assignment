import { useCallback, useState } from "react";

const STORAGE_KEY = "weatherapp:bookmarks";

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

export function useBookmarkToggle() {
  const [ids, setIds] = useState<string[]>(() => readBookmarks());

  const isBookmarked = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      const next = ids.includes(id)
        ? ids.filter((x) => x !== id)
        : [...ids, id];

      setIds(next);
      writeBookmarks(next);
    },
    [ids]
  );

  return { ids, isBookmarked, toggle };
}
