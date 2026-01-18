export const bookmarkKeys = {
  all: ["bookmark"] as const,
  summary: (id: string) => [...bookmarkKeys.all, "summary", id] as const,
};
