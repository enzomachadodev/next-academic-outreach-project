"use client";

import { Edit } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { UserData } from "../lib/types";
import { EditProfileDialog } from "./edit-profile-dialog";

interface EditProfileButtonProps {
  user: UserData;
}

export const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="secondary"
        className="absolute right-4 top-4"
        onClick={() => setShowDialog(true)}
      >
        Editar Perfil
        <Edit />
      </Button>
      <EditProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
};
