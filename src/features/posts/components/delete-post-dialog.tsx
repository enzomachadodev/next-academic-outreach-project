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
          <DialogTitle>Delete post?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter className="flex-row justify-end gap-2">
          <Button
            variant="destructive"
            onClick={handleDeletePost}
            loading={isPending}
          >
            Delete
          </Button>
          <Button variant="outline" disabled={isPending} onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
