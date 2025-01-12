import { useQuery } from "@tanstack/react-query";

import { usersQueryKeys } from "@/features/users/lib/query-keys";
import { FollowerInfo } from "@/features/users/lib/types";
import { apiInstance } from "@/lib/api";

export const useFollowerInfo = (userId: string, initialState: FollowerInfo) => {
  const query = useQuery({
    queryKey: usersQueryKeys.follower(userId),
    queryFn: () =>
      apiInstance.get(`/api/users/${userId}/followers`).json<FollowerInfo>(),
    initialData: initialState,
    staleTime: Infinity,
  });

  return query;
};
