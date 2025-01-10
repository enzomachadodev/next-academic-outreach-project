import { Suspense } from "react";

import { db } from "@/db";
import { PostCard } from "@/features/posts/components/post-card";
import { PostEditor } from "@/features/posts/components/post-editor";
import { postDataInclude } from "@/features/posts/lib/types";
import { UsersToKnow } from "@/features/users/components/users-to-know";

const Feed = async () => {
  const posts = await db.post.findMany({
    include: postDataInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="grid min-h-screen w-full grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="col-span-1 flex w-full flex-col gap-4 sm:gap-8 lg:col-span-2">
        <PostEditor />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="sticky top-24 col-span-1 hidden h-[500px] lg:flex">
        <Suspense fallback={<span>Carregando...</span>}>
          <UsersToKnow />
        </Suspense>
      </div>
    </main>
  );
};

export default Feed;
