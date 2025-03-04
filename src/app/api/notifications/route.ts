import { NextRequest } from "next/server";

import { getSession } from "@/features/auth/lib/actions";
import {
  notificationsInclude,
  NotificationsPage,
} from "@/features/notifications/lib/types";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;

    const notifications = await db.notification.findMany({
      where: {
        recipientId: user.id,
      },
      include: notificationsInclude,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      notifications.length > pageSize ? notifications[pageSize].id : null;

    const data: NotificationsPage = {
      notifications: notifications.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
