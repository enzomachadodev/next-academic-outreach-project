"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { InfiniteScrollContainer } from "@/components/ui/infinite-scroll-container";
import {
  PostCard,
  PostCardSkeleton,
} from "@/features/posts/components/post-card";
import { postQueryKeys } from "@/features/posts/lib/query-keys";
import { PostsPage } from "@/features/posts/lib/types";
import { apiInstance } from "@/lib/api";

interface UserPostsProps {
  userId: string;
}

export const UserPosts = ({ userId }: UserPostsProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: postQueryKeys.user(userId),
    queryFn: ({ pageParam }) =>
      apiInstance
        .get(
          `/api/users/${userId}/posts`,
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
        Esse usuário ainda não fez nenhuma publicação.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        Ocorreu um erro ao carregar as postagens.
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
          Isso é tudo, pessoal! 🐰
        </p>
      )}
    </InfiniteScrollContainer>
  );
};
