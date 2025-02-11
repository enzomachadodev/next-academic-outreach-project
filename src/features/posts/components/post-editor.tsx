"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDropzone } from "@uploadthing/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/features/auth/lib/auth-client";
import { UserAvatar } from "@/features/users/components/user-avatar";
import { useMediaUpload } from "@/hooks/use-media-upload";
import { cn } from "@/lib/utils";

import { useSubmitPostMutation } from "../lib/mutations";
import { AddAttachmentsButton } from "./add-attachments-button";
import { AttachmentPreviews } from "./attachments-preview";

export const PostEditor = () => {
  const { data: session } = useSession();
  const { mutate, isPending } = useSubmitPostMutation();

  const {
    startUpload,
    isUploading,
    uploadProgress,
    attachments,
    removeAttachment,
    reset: resetMediaUploads,
  } = useMediaUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: startUpload,
  });

  // eslint-disable-next-line
  const { onClick, ...rootProps } = getRootProps();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "O que você está pensando?",
      }),
    ],
    immediatelyRender: false,
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = () => {
    mutate(
      {
        content: input,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          resetMediaUploads();
          toast.success("Postagem criada com sucesso!");
        },
      },
    );
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const files = Array.from(e.clipboardData.items)
      .filter((item) => item.kind === "file")
      .map((item) => item.getAsFile()) as File[];
    startUpload(files);
  };

  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <div className="flex gap-6">
          <UserAvatar
            name={session?.user.name || ""}
            image={session?.user.image || ""}
            className="hidden size-[70px] sm:inline"
          />
          <div {...rootProps} className="w-full">
            <EditorContent
              editor={editor}
              className={cn(
                "max-h-60 min-h-14 w-full rounded-md border border-input bg-transparent p-6 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                isDragActive && "outline-dashed",
              )}
              onPaste={onPaste}
            />
            <input {...getInputProps} />
          </div>
          {!!attachments.length && (
            <AttachmentPreviews
              attachments={attachments}
              removeAttachment={removeAttachment}
            />
          )}
        </div>
        <div className="flex w-full justify-end">
          {isUploading && (
            <>
              <span className="text-sm">{uploadProgress || 0}%</span>
              <Loader2 className="size-5 animate-spin text-primary" />
            </>
          )}
          <AddAttachmentsButton
            onFilesSelected={startUpload}
            disabled={isUploading || attachments.length >= 5 || isPending}
          />
          <Button
            size="lg"
            onClick={onSubmit}
            disabled={!input.trim() || isUploading}
            loading={isPending}
          >
            Publicar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
