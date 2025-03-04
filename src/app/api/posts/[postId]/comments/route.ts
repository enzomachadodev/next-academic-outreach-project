import { NextRequest } from "next/server";

import { getSession } from "@/features/auth/lib/actions";
import {
  CommentsPage,
  getCommentDataInclude,
} from "@/features/posts/lib/types";
import { db } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params;

    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 5;

    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;

    const comments = await db.comment.findMany({
      where: { postId },
      include: getCommentDataInclude(user.id),
      orderBy: { createdAt: "asc" },
      take: -pageSize - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const previousCursor = comments.length > pageSize ? comments[0].id : null;

    const data: CommentsPage = {
      comments: comments.length > pageSize ? comments.slice(1) : comments,
      previousCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
