"use client";

import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { apiInstance } from "@/lib/api";

import { NotificationCountInfo } from "../lib/types";

interface NotificationsButtonProps {
  initialState: NotificationCountInfo;
}

export const NotificationsButton = ({
  initialState,
}: NotificationsButtonProps) => {
  const { data } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: () =>
      apiInstance
        .get("/api/notifications/unread-count")
        .json<NotificationCountInfo>(),
    initialData: initialState,
    refetchInterval: 60 * 1000,
  });

  return (
    <Button
      variant="outline"
      className="flex size-11 items-center justify-center gap-3 rounded-full"
      title="Notifications"
      asChild
    >
      <Link href="/notifications">
        <div className="relative">
          <Bell className="size-8" />
          {!!data.unreadCount && (
            <div className="absolute -right-4 -top-4 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-[2px] text-xs font-semibold tabular-nums text-primary-foreground">
              {data.unreadCount}
            </div>
          )}
        </div>
        <span className="sr-only hidden lg:inline">Notifications</span>
      </Link>
    </Button>
  );
};
