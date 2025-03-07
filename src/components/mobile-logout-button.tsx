"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

import { useSession } from "@/features/auth/lib/auth-client";
import { UserAvatar } from "@/features/users/components/user-avatar";

import { LogoutDialog } from "./logout-dialog";

export const MobileLogoutButton = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const { data: session } = useSession();

  return (
    <>
      <div className="border-t p-2 py-4">
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="flex w-full items-center justify-between rounded-xl p-2 duration-300 hover:bg-muted"
        >
          <div className="flex items-center gap-4">
            <UserAvatar
              image={session?.user.image || ""}
              name={session?.user.name || ""}
              className="size-12 border"
            />
            <div className="flex flex-col items-start">
              <p className="line-clamp-1 max-w-[90%] break-all font-semibold">
                {session?.user.name}
              </p>
              <p className="text-xs text-muted-foreground">
                @{session?.user.username}
              </p>
            </div>
          </div>
          <LogOut className="text-destructive" />
        </button>
      </div>
      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
      />
    </>
  );
};
