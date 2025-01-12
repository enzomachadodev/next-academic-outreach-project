import {
  InfiniteData,
  Query,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useSession } from "@/features/auth/lib/auth-client";

import { deletePost, submitPost } from "./actions";
import { postQueryKeys } from "./query-keys";
import { PostsPage } from "./types";

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
