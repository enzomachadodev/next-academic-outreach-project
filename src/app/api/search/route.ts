import { NextRequest } from "next/server";

import { getSession } from "@/features/auth/lib/actions";
import { getPostDataInclude, PostsPage } from "@/features/posts/lib/types";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q") || "";
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const searchQuery = q.split(" ").join(" & ");

    const pageSize = 10;

    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;

    const posts = await db.post.findMany({
      where: {
        OR: [
          {
            content: {
              contains: searchQuery,
            },
          },
          {
            user: {
              name: {
                contains: searchQuery,
              },
            },
          },
          {
            user: {
              username: {
                contains: searchQuery,
              },
            },
          },
        ],
      },
      include: getPostDataInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
