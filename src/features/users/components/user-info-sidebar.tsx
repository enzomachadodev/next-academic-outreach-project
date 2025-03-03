import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/features/auth/lib/actions";

import { UserData } from "../lib/types";
import { FollowButton } from "./follow-button";
import { UserAvatar } from "./user-avatar";

interface UserInfoSidebarProps {
  user: UserData;
}

export const UserInfoSidebar = async ({ user }: UserInfoSidebarProps) => {
  const session = await getSession();

  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>About this user</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Link href={`/profile/${user.username}`}>
          <div className="flex items-center gap-4">
            <UserAvatar
              name={user.name}
              image={user.image}
              className="size-12"
            />

            <div>
              <p className="line-clamp-1 break-all font-semibold hover:underline">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
            </div>
          </div>
        </Link>
        <div className="line-clamp-6 whitespace-pre-line break-words text-muted-foreground">
          {user.bio}
        </div>

        {user.id !== session?.user.id && (
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: user.followers.some(
                ({ followerId }) => followerId === session?.user.id,
              ),
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};
