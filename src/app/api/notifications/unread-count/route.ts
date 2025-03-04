import { getSession } from "@/features/auth/lib/actions";
import { NotificationCountInfo } from "@/features/notifications/lib/types";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { user } = session;

    const unreadCount = await db.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    });

    const data: NotificationCountInfo = {
      unreadCount,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
