import { Suspense } from "react";

import { UsersToKnow } from "@/features/users/components/users-to-know";

import { TrendingTopics } from "./trending-topics";
import { Skeleton } from "./ui/skeleton";

export const TrendsSidebar = () => (
  <div className="sticky top-28 col-span-1 hidden flex-col gap-8 lg:flex">
    <Suspense fallback={<TrendsSidebarSkeleton />}>
      <UsersToKnow />
      <TrendingTopics />
    </Suspense>
  </div>
);

export const TrendsSidebarSkeleton = () => (
  <div className="sticky top-28 col-span-1 hidden flex-col gap-8 lg:flex">
    <Skeleton className="h-[400px] w-full rounded-3xl" />
    <Skeleton className="h-[300px] w-full rounded-3xl" />
  </div>
);
