import { NextRequest } from "next/server";

import { db } from "@/db";
import { getSession } from "@/features/auth/actions/get-session";
import { postDataInclude } from "@/features/posts/lib/types";

export async function GET(request: NextRequest) {
  console.log(request);

  try {
    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await db.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: "desc" },
    });

    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
