export const usersQueryKeys = {
  follower: (userId: string) => ["follower-info", userId] as const,
};
