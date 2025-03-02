import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

import { getSession } from "@/features/auth/lib/actions";
import { PostDetail } from "@/features/posts/components/post-detail";
import { getPostDataInclude } from "@/features/posts/lib/types";
import { UsersToKnow } from "@/features/users/components/users-to-know";
import { db } from "@/lib/db";
import { idSchema } from "@/lib/validation";

interface PageProps {
  params: Promise<{ postId: string }>;
}

const getPost = cache(async (postId: string, loggedInUserId?: string) => {
  const validatedId = idSchema.safeParse(postId);

  if (!validatedId.success) return notFound();

  const post = await db.post.findUnique({
    where: {
      id: validatedId.data,
    },
    include: getPostDataInclude(loggedInUserId),
  });

  if (!post) return notFound();

  return post;
});

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { postId } = await params;

  const session = await getSession();

  const post = await getPost(postId, session?.user.id);

  return {
    title: `${post.user.name}: ${post.content.slice(0, 50)}...`,
  };
};

const Page = async ({ params }: PageProps) => {
  const { postId } = await params;

  const session = await getSession();

  const post = await getPost(postId, session?.user.id);

  return (
    <main className="wrapper grid min-h-screen w-full grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
      <div className="col-span-1 flex w-full flex-col gap-4 sm:gap-8 lg:col-span-2">
        <PostDetail post={post} />
      </div>
      <div className="sticky top-24 col-span-1 hidden h-[500px] lg:flex">
        <Suspense fallback={<span>Carregando...</span>}>
          <UsersToKnow />
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
