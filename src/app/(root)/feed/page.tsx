import { CompanySuggestions } from "@/features/feed/components/company-suggestions";
import { CreatePostButton } from "@/features/feed/components/create-post-button";
import { PostCard } from "@/features/feed/components/post-card";

const Feed = () => {
  return (
    <main className="container mx-auto grid min-h-screen w-full grid-cols-1 gap-8 px-4 pt-24 sm:px-8 lg:grid-cols-3">
      <div className="col-span-2 flex w-full flex-col gap-8">
        <CreatePostButton />
        <ul>
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </ul>
      </div>
      <div className="sticky top-24 col-span-1 hidden h-[500px] lg:block">
        <CompanySuggestions />
      </div>
    </main>
  );
};

export default Feed;
