import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { deletePost, submitPost } from "./actions";
import { postQueryKeys } from "./query-keys";
import { PostsPage } from "./types";

export const useSubmitPostMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: submitPost,
    onSuccess: async (newPost) => {
      const queryFilter: QueryFilters<
        InfiniteData<PostsPage, string | null>,
        Error
      > = { queryKey: postQueryKeys.feed("for-you") };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];

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
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return !query.state.data;
        },
      });

      toast.success("Postagem criada com sucesso!");
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
      toast.success("Post deletado com sucesso!");

      if (pathname === `/posts/${deletedPost.id}`) {
        router.push("/feed");
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        "Error ao deletar postagem. Por favor, tente novamente mais tarde.",
      );
    },
  });

  return mutation;
};
