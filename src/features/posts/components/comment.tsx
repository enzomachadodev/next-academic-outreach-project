"use client";

import Link from "next/link";

import { useSession } from "@/features/auth/lib/auth-client";
import { UserAvatar } from "@/features/users/components/user-avatar";
import { UserTooltip } from "@/features/users/components/user-tooltip";
import { formatRelativeDate } from "@/lib/utils";

import { CommentData } from "../lib/types";
import { CommentMoreButton } from "./comment-more-button";

interface CommentProps {
  comment: CommentData;
}

export const Comment = ({ comment }: CommentProps) => {
  const { data: session } = useSession();

  return (
    <div className="group/comment flex gap-4 py-4">
      <UserTooltip user={comment.user}>
        <Link href={`/users/${comment.user.username}`}>
          <UserAvatar
            image={comment.user.image || ""}
            name={comment.user.name || ""}
            className="size-10"
          />
        </Link>
      </UserTooltip>
      <div>
        <div className="flex items-center gap-1 text-sm">
          <UserTooltip user={comment.user}>
            <Link
              href={`/users/${comment.user.username}`}
              className="line-clamp-1 max-w-40 font-medium hover:underline md:max-w-max"
            >
              {comment.user.name}
            </Link>
          </UserTooltip>
          <span className="hidden text-muted-foreground md:block">
            {formatRelativeDate(comment.createdAt)}
          </span>
        </div>
        <div>{comment.content}</div>
      </div>
      {comment.user.id === session?.user.id && (
        <CommentMoreButton comment={comment} className="ms-auto" />
      )}
    </div>
  );
};
