import { DialogTitle } from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { useDeletePostMutation } from "../lib/mutations";
import { PostData } from "../lib/types";

interface DeletePostDialogProps {
  post: PostData;
  isOpen: boolean;
  onClose: () => void;
}

export const DeletePostDialog = ({
  post,
  isOpen,
  onClose,
}: DeletePostDialogProps) => {
  const { mutate, isPending } = useDeletePostMutation();

  const handleOpenChange = (open: boolean) => {
    if (!open || !isPending) {
      onClose();
    }
  };

  const handleDeletePost = () => {
    mutate({ postId: post.id }, { onSuccess: onClose });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apagar publicação?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Tem certeza de que deseja apagar essa publicação? Essa ação não pode
          ser desfeita.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDeletePost}
            loading={isPending}
          >
            Apagar
          </Button>
          <Button variant="outline" disabled={isPending} onClick={onClose}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
