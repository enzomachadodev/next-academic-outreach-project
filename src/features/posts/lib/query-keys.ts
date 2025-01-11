export const postQueryKeys = {
  all: ["posts"] as const,
  feed: (type: "for-you" | "following") => ["posts", "feed", type] as const,
  detail: (id: string) => ["posts", "detail", id] as const,
};
