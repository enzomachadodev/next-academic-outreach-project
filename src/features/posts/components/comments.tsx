import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { apiInstance } from "@/lib/api";

import { CommentsPage, PostData } from "../lib/types";
import { Comment } from "./comment";
import { CommentInput } from "./comment-input";

interface CommentsProps {
  post: PostData;
}

export const Comments = ({ post }: CommentsProps) => {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useInfiniteQuery({
      queryKey: ["comments", post.id],
      queryFn: ({ pageParam }) =>
        apiInstance
          .get(
            `/api/posts/${post.id}/comments`,
            pageParam ? { searchParams: { cursor: pageParam } } : {},
          )
          .json<CommentsPage>(),
      initialPageParam: null as string | null,
      getNextPageParam: (firstPage) => firstPage.previousCursor,
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
    });

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  return (
    <div className="space-y-4 p-4 pb-0 sm:p-5">
      <CommentInput post={post} />
      {hasNextPage && (
        <Button
          variant="link"
          className="mx-auto block"
          disabled={isFetching}
          onClick={() => fetchNextPage()}
        >
          Load previous comments
        </Button>
      )}
      {status === "pending" && (
        <Loader2 className="mx-auto animate-spin pb-5" />
      )}
      {status === "success" && !comments.length ? (
        <p className="pb-5 text-center text-muted-foreground">
          No comments yet.
        </p>
      ) : (
        <div className="divide-y">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}
      {status === "error" && (
        <p className="pb-5 text-center text-destructive">
          An error occurred while loading comments.
        </p>
      )}
    </div>
  );
};
