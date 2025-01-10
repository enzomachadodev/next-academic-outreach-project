import { db } from "@/db";
import { PostCard } from "@/features/posts/components/post-card";
import { PostEditor } from "@/features/posts/components/post-editor";
import { postDataInclude } from "@/features/posts/lib/types";

const Feed = async () => {
  const posts = await db.post.findMany({
    include: postDataInclude,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="grid w-full grid-cols-1 gap-8 border border-green-500 lg:grid-cols-3">
      <div className="col-span-1 w-full lg:col-span-2">
        <PostEditor />
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="col-span-1 h-[400px] bg-red-500"></div>
    </main>
  );
};

export default Feed;
