import { Metadata } from "next";

import { TrendsSidebar } from "@/components/trends-sidebar";
import { ForYouFeed } from "@/features/posts/components/for-you-feed";
import { PostEditor } from "@/features/posts/components/post-editor";

export const metadata: Metadata = {
  title: "Feed",
};

const Feed = () => {
  return (
    <main className="wrapper grid min-h-screen w-full grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
      <div className="col-span-1 flex w-full flex-col gap-4 sm:gap-8 lg:col-span-2">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default Feed;
