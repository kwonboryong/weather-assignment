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

export function useBookmarks() {
  const [ids, setIds] = useState<string[]>(() => readBookmarks());

  const isBookmarked = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback((id: string) => {
    const current = readBookmarks();
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];

    setIds(next);
    writeBookmarks(next);
  }, []);

  const remove = useCallback((id: string) => {
    const current = readBookmarks();
    const next = current.filter((x) => x !== id);

    setIds(next);
    writeBookmarks(next);
  }, []);

  return { ids, isBookmarked, toggle, remove };
}
