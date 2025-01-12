"use client";

import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useFollowerInfo } from "@/hooks/useFollowerInfo";
import { apiInstance } from "@/lib/api";

import { usersQueryKeys } from "../lib/query-keys";
import { FollowerInfo } from "../lib/types";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

export const FollowButton = ({ userId, initialState }: FollowButtonProps) => {
  const queryClient = useQueryClient();

  const { data } = useFollowerInfo(userId, initialState);

  const queryKey: QueryKey = usersQueryKeys.follower(userId);

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? apiInstance.delete(`/api/users/${userId}/followers`)
        : apiInstance.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : +1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));

      return { previousState };
    },
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast.error(
        "Algo de errado aconteceu. Por favor, tente novamente mais tarde.",
      );
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      variant={data.isFollowedByUser ? "secondary" : "default"}
    >
      {data.isFollowedByUser ? "Seguindo" : "Seguir"}
    </Button>
  );
};
