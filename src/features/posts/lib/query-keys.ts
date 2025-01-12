export const postQueryKeys = {
  all: ["posts"] as const,
  feed: (type: "for-you" | "following") => ["posts", type] as const,
  user: (userId: string) => ["posts", "user-posts", userId] as const,
  detail: (id: string) => ["posts", "detail", id] as const,
};
