"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { InfiniteScrollContainer } from "@/components/ui/infinite-scroll-container";
import { apiInstance } from "@/lib/api";

import { postQueryKeys } from "../lib/query-keys";
import { PostsPage } from "../lib/types";
import { PostCard, PostCardSkeleton } from "./post-card";

export const ForYouFeed = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: postQueryKeys.feed("for-you"),
    queryFn: ({ pageParam }) =>
      apiInstance
        .get(
          "/api/posts/for-you",
          pageParam
            ? {
                searchParams: {
                  cursor: pageParam,
                },
              }
            : {},
        )
        .json<PostsPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return (
      <div className="space-y-4 sm:space-y-8">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    );
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No publications found.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-4 sm:space-y-8"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto animate-spin" />}
      {!hasNextPage && (
        <p className="text-center text-muted-foreground">
          You have reached the end of the page.
        </p>
      )}
    </InfiniteScrollContainer>
  );
};
