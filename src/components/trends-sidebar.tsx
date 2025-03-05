import { Suspense } from "react";

import { UsersToKnow } from "@/features/users/components/users-to-know";

import { TrendingTopics } from "./trending-topics";

export const TrendsSidebar = () => {
  return (
    <div className="sticky top-24 col-span-1 hidden h-[500px] flex-col lg:flex">
      <Suspense fallback={<span>Carregando...</span>}>
        <UsersToKnow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};
