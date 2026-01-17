import { useCallback, useState } from "react";

const STORAGE_KEY = "weatherapp:bookmark-aliases";

type AliasMap = Record<string, string>;

function readAliases(): AliasMap {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === "object") {
      return parsed;
    }

    return {};
  } catch {
    return {};
  }
}

function writeAliases(map: AliasMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function useAliases() {
  const [aliases, setAliases] = useState<AliasMap>(() => readAliases());

  const getAlias = useCallback((id: string) => aliases[id] ?? "", [aliases]);

  const setAlias = useCallback((id: string, value: string) => {
    const alias = value.trim();

    setAliases((prev) => {
      const next = { ...prev };

      if (!alias) {
        delete next[id];
      } else {
        next[id] = alias;
      }

      writeAliases(next);

      return next;
    });
  }, []);

  const removeAlias = useCallback((id: string) => {
    setAliases((prev) => {
      if (!prev[id]) return prev;

      const next = { ...prev };
      delete next[id];

      writeAliases(next);

      return next;
    });
  }, []);

  return { getAlias, setAlias, removeAlias };
}
