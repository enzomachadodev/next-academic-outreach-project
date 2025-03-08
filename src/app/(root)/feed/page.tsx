import { Metadata } from "next";

import { PageContainer } from "@/components/page-container";
import { ForYouFeed } from "@/features/posts/components/for-you-feed";
import { PostEditor } from "@/features/posts/components/post-editor";

export const metadata: Metadata = {
  title: "Feed",
};

const Feed = () => {
  return (
    <PageContainer>
      <PostEditor />
      <ForYouFeed />
    </PageContainer>
  );
};

export default Feed;
