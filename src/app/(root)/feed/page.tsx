import { PostEditor } from "@/features/posts/components/post-editor";

const Feed = async () => {
  return (
    <main className="grid w-full grid-cols-1 gap-8 border border-green-500 lg:grid-cols-3">
      <div className="col-span-1 w-full lg:col-span-2">
        <PostEditor />
      </div>
      <div className="col-span-1 h-[400px] bg-red-500"></div>
    </main>
  );
};

export default Feed;
