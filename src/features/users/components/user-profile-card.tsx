import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

import { UserData } from "../lib/types";
import { EditProfileButton } from "./edit-profile-button";
import { FollowButton } from "./follow-button";
import { UserAvatar } from "./user-avatar";
import { UserBio } from "./user-bio";

interface UserProfileProps {
  user: UserData;
  loggedUserId?: string;
}

const StatItem = ({ count, label }: { count: string; label: string }) => (
  <div className="flex w-20 flex-col items-center">
    <span className="text-xl font-bold">{count}</span>
    <span className="text-sm font-light text-muted-foreground">{label}</span>
  </div>
);

const Metrics = ({ user }: { user: UserData }) => (
  <div className="flex items-center gap-3">
    <StatItem count={`${user._count.posts}`} label="Posts" />
    <div className="h-14 w-px bg-muted-foreground" />
    <StatItem count={`${user._count.followers}`} label="Followers" />
    <div className="h-14 w-px bg-muted-foreground" />
    <StatItem count={`${user._count.following}`} label="Following" />
  </div>
);

export const UserProfileCard = ({ user, loggedUserId }: UserProfileProps) => {
  return (
    <Card className="w-full overflow-hidden">
      <div className="relative h-48 w-full bg-primary">
        {user.id == loggedUserId && <EditProfileButton user={user} />}
      </div>
      <div className="relative flex flex-col items-center gap-y-5 p-5 pt-48">
        <div className="absolute -top-14 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 lg:-top-[88px]">
          <div className="rounded-full bg-background p-2">
            <UserAvatar
              name={user.name}
              image={user.image}
              className="size-36 lg:size-44"
            />
          </div>
          <div className="space-y-1 text-center">
            <CardTitle className="text-nowrap text-xl">{user.name}</CardTitle>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
        </div>
        <div className="left-0 top-5 flex w-full flex-col items-center justify-between gap-5 2xl:absolute 2xl:flex-row 2xl:items-start 2xl:px-5">
          <Metrics user={user} />
          {user.bio && <UserBio content={user.bio} />}
        </div>
        {user.id !== loggedUserId && (
          <div className="flex items-center gap-4">
            <FollowButton
              userId={user.id}
              initialState={{
                followers: user._count.followers,
                isFollowedByUser: user.followers.some(
                  ({ followerId }) => followerId === loggedUserId,
                ),
              }}
            />
            <Button>Support</Button>
          </div>
        )}
      </div>
    </Card>
  );
};
