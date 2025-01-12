import { Prisma } from "@prisma/client";

export const getUserDataSelect = (loggedInUserId?: string) => {
  return {
    id: true,
    username: true,
    name: true,
    image: true,
    bio: true,
    pixKey: true,
    createdAt: true,
    company: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
};

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}
