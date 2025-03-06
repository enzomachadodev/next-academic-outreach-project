import {
  InfiniteData,
  Query,
  QueryFilters,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSession } from "@/features/auth/lib/auth-client";

import {
  deleteComment,
  deletePost,
  submitComment,
  submitPost,
} from "./actions";
import { postQueryKeys } from "./query-keys";
import { CommentsPage, PostsPage } from "./types";

export const useSubmitPostMutation = () => {
  const queryClient = useQueryClient();

  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters<InfiniteData<PostsPage>> = {
        queryKey: postQueryKeys.all,
        predicate(query) {
          const isForYou = query.queryKey.includes("for-you");
          const isUserPosts =
            query.queryKey.includes("user-posts") &&
            query.queryKey.includes(session?.user.id);

          return isForYou || isUserPosts;
        },
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return undefined;

          const firstPage = oldData.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
          return oldData;
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query: Query<InfiniteData<PostsPage>, Error>): boolean {
          return !!queryFilter.predicate?.(query) && !query.state.data;
        },
      });

      toast.success("Post created successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  return mutation;
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters<
        InfiniteData<PostsPage, string | null>,
        Error
      > = { queryKey: postQueryKeys.all };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((post) => post.id !== deletedPost.id),
            })),
          };
        },
      );
      toast.success("Post deleted successfully!");

      if (pathname === `/posts/${deletedPost.id}`) {
        router.push("/feed");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error deleting post. Please try again later.");
    },
  });

  return mutation;
};

export function useSubmitCommentMutation(postId: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitComment,
    onSuccess: async (newComment) => {
      const queryKey: QueryKey = ["comments", postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  previousCursor: firstPage.previousCursor,
                  comments: [...firstPage.comments, newComment],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast.success("Comment created");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to submit comment. Please try again.");
    },
  });

  return mutation;
}

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: async (deletedComment) => {
      const queryKey: QueryKey = ["comments", deletedComment.postId];

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<InfiniteData<CommentsPage, string | null>>(
        queryKey,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              previousCursor: page.previousCursor,
              comments: page.comments.filter((c) => c.id !== deletedComment.id),
            })),
          };
        },
      );

      toast.success("Comment deleted");
    },
    onError(error) {
      console.error(error);
      toast.error("Failed to delete comment. Please try again.");
    },
  });

  return mutation;
}
