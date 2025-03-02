"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "@/features/auth/lib/auth-client";

import { FollowerInfo, UserData } from "../lib/types";
import { FollowButton } from "./follow-button";
import { UserAvatar } from "./user-avatar";

interface UserTooltipProps extends PropsWithChildren {
  user: UserData;
}

export const UserTooltip = ({ user, children }: UserTooltipProps) => {
  const { data: session } = useSession();

  const followerState: FollowerInfo = {
    followers: user._count.followers,
    isFollowedByUser: !!user.followers.some(
      ({ followerId }) => followerId === session?.user.id,
    ),
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <div className="flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 md:min-w-52">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/users/${user.username}`}>
                <UserAvatar name={user.name} image={user.image || ""} />
              </Link>
              {session?.user.id !== user.id && (
                <FollowButton userId={user.id} initialState={followerState} />
              )}
            </div>
            <div>
              <Link href={`/users/${user.username}`}>
                <div className="text-lg font-semibold hover:underline">
                  {user.name}
                </div>
                <div className="text-muted-foreground">@{user.username}</div>
              </Link>
            </div>
            {user.bio && (
              <div className="line-clamp-4 whitespace-pre-line">{user.bio}</div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
