"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/features/auth/lib/auth-client";
import { UserAvatar } from "@/features/users/components/user-avatar";
import { UserTooltip } from "@/features/users/components/user-tooltip";
import { formatRelativeDate } from "@/lib/utils";

import { PostData } from "../lib/types";
import { MediaPreviews } from "./media-previews";
import { PostMoreButton } from "./post-more-button";

interface PostDetail {
  post: PostData;
}

export const PostDetail = ({ post }: PostDetail) => {
  const { data: session } = useSession();

  return (
    <article className="w-full">
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <UserTooltip user={post.user}>
              <Link href={`/users/${post.user.username}`}>
                <UserAvatar
                  name={post.user.name || ""}
                  image={post.user.image || ""}
                />
              </Link>
            </UserTooltip>
            <div className="space-y-1">
              <UserTooltip user={post.user}>
                <Link href={`/profile/${post.user.username}`}>
                  <CardTitle className="hover:underline">
                    {post.user.name}
                  </CardTitle>
                </Link>
              </UserTooltip>

              <Link
                href={`/posts/${post.id}`}
                className="block text-sm text-muted-foreground hover:underline"
                suppressHydrationWarning
              >
                {formatRelativeDate(post.createdAt)}
              </Link>
            </div>
          </div>
          {session?.user.id === post.userId && <PostMoreButton post={post} />}
        </CardHeader>
        <CardContent>
          <article className="whitespace-pre-line break-words">
            {post.content}
          </article>
          {!!post.attachments.length && (
            <MediaPreviews attachments={post.attachments} />
          )}
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </article>
  );
};
