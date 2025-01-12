import { NextRequest } from "next/server";

import { getSession } from "@/features/auth/lib/actions";
import { FollowerInfo } from "@/features/users/lib/types";
import { db } from "@/lib/db";
import { idSchema } from "@/lib/validation";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    const session = await getSession();

    const validId = idSchema.parse(userId);

    const user = await db.user.findUnique({
      where: {
        id: validId,
      },
      select: {
        followers: {
          where: {
            followerId: session?.userId,
          },
          select: {
            followerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });

    if (!user) {
      return Response.json(
        { error: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    const data: FollowerInfo = {
      followers: user._count.followers,
      isFollowedByUser: !!user.followers.length,
    };

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const validId = idSchema.parse(userId);

    await db.follow.upsert({
      where: {
        followerId_followingId: {
          followerId: session.userId,
          followingId: validId,
        },
      },
      create: {
        followerId: session.userId,
        followingId: userId,
      },
      update: {},
    });

    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const validId = idSchema.parse(userId);

    // Using deleteMany to avoid throwing an error
    await db.follow.deleteMany({
      where: {
        followerId: session.userId,
        followingId: validId,
      },
    });

    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
