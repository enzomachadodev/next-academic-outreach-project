import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { postQueryKeys } from "@/features/posts/lib/query-keys";
import { PostsPage } from "@/features/posts/lib/types";
import { useUploadThing } from "@/lib/uploadthing";

import { updateUserProfile } from "./actions";
import { UpdateUserProfileSchema } from "./validations";

export const useUpdateUserProfileMutation = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { startUpload: startAvatarUpload } = useUploadThing("avatar");

  const mutation = useMutation({
    mutationFn: async ({
      values,
      avatar,
    }: {
      values: UpdateUserProfileSchema;
      avatar?: File;
    }) => {
      return Promise.all([
        updateUserProfile(values),
        avatar && startAvatarUpload([avatar]),
      ]);
    },
    onSuccess: async ([updatedUser, uploadResult]) => {
      const newAvatarUrl = uploadResult?.[0].serverData.avatarUrl;

      const queryFilter: QueryFilters<
        InfiniteData<PostsPage, string | null>,
        Error
      > = {
        queryKey: postQueryKeys.all,
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map((post) => {
                if (post.user.id === updatedUser.id) {
                  return {
                    ...post,
                    user: {
                      ...updatedUser,
                      image: newAvatarUrl || updatedUser.image,
                    },
                  };
                }
                return post;
              }),
            })),
          };
        },
      );
      router.refresh();

      toast.success("Perfil atualizado com sucesso!");
    },
    onError(error) {
      console.error(error);
      toast.error(
        "Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente mais tarde",
      );
    },
  });

  return mutation;
};
