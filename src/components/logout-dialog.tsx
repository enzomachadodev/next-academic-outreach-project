"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { signOut } from "@/features/auth/lib/auth-client";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutDialog = ({ isOpen, onClose }: LogoutDialogProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          onClose();
          router.push("/login");
        },
      },
    });
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log out?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to log out? You will need to sign in again to
          access your account.
        </DialogDescription>
        <DialogFooter className="flex flex-row justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Log out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
