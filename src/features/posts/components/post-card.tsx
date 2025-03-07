"use client";

import Link from "next/link";
import { useState } from "react";

import { Linkify } from "@/components/linkify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/features/auth/lib/auth-client";
import { UserAvatar } from "@/features/users/components/user-avatar";
import { formatRelativeDate } from "@/lib/utils";

import { PostData } from "../lib/types";
import { CommentButton } from "./comment-button";
import { Comments } from "./comments";
import { LikeButton } from "./like-button";
import { MediaPreviews } from "./media-previews";
import { PostMoreButton } from "./post-more-button";

interface PostCardProps {
  post: PostData;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { id, content, attachments, user, createdAt } = post;

  const { data: session } = useSession();

  const [showComments, setShowComments] = useState(false);

  return (
    <article className="w-full">
      <Card>
        <CardHeader className="flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href={`/profile/${user.username}`}>
              <UserAvatar
                name={user.name}
                image={user.image || ""}
                className="size-12"
              />
            </Link>
            <div className="space-y-1">
              <Link href={`/profile/${user.username}`}>
                <CardTitle className="line-clamp-1 max-w-48 hover:underline sm:max-w-max">
                  {user.name}
                </CardTitle>
              </Link>
              <Link
                href={`/posts/${id}`}
                className="block text-sm text-muted-foreground hover:underline"
                suppressHydrationWarning
              >
                {formatRelativeDate(createdAt)}
              </Link>
            </div>
          </div>
          {session?.user.id === post.userId && <PostMoreButton post={post} />}
        </CardHeader>
        <CardContent>
          <Linkify>
            <article className="whitespace-pre-line break-words">
              {content}
            </article>
          </Linkify>
          {!!post.attachments.length && (
            <MediaPreviews attachments={attachments} />
          )}
        </CardContent>
        <CardFooter className="gap-6">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some((like) => like.userId === user.id),
            }}
          />
          <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
          />
        </CardFooter>
        {showComments && <Comments post={post} />}
      </Card>
    </article>
  );
};

export const PostCardSkeleton = () => (
  <div className="space-y-6 p-6">
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-3 w-[120px]" />
      </div>
    </div>
    <Skeleton className="h-40 w-full" />
  </div>
);
