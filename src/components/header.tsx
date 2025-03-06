import { getSession } from "@/features/auth/lib/actions";
import { NotificationsButton } from "@/features/notifications/components/notification-button";
import { UserButton } from "@/features/users/components/user-button";
import { db } from "@/lib/db";

import { Logo } from "./logo";
import { SearchField } from "./search-field";

export const Header = async () => {
  const session = await getSession();

  const unreadNotificationsCount = session
    ? await db.notification.count({
        where: {
          recipientId: session?.user.id,
          read: false,
        },
      })
    : 0;

  return (
    <header className="sticky left-0 top-0 z-10 w-full border-b border-muted bg-background py-4">
      <div className="wrapper flex items-center justify-between">
        <div className="inline-flex items-center gap-4">
          <Logo />
        </div>
        {session && (
          <div className="inline-flex items-center gap-4">
            <SearchField />
            <NotificationsButton
              initialState={{ unreadCount: unreadNotificationsCount }}
            />
            <UserButton />
          </div>
        )}
      </div>
    </header>
  );
};
