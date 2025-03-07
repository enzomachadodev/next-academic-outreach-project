"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDropzone } from "@uploadthing/react";
import { Loader2, Paperclip, SendHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaUpload } from "@/hooks/use-media-upload";
import { cn } from "@/lib/utils";

import { useSubmitPostMutation } from "../lib/mutations";
import { AddAttachmentsButton } from "./add-attachments-button";
import { AttachmentPreviews } from "./attachments-preview";

export const PostEditor = () => {
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
        placeholder: "What’s on your mind right now?",
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
          toast.success("Post created successfully!");
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
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Paperclip className="size-5 text-muted-foreground" />
            <div {...rootProps} className="w-full">
              <EditorContent
                editor={editor}
                className={cn(
                  "max-h-60 min-h-16 w-full overflow-y-auto bg-transparent text-base placeholder:font-semibold placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 focus-visible:disabled:cursor-not-allowed md:text-sm",
                  isDragActive && "outline-dashed",
                )}
                onPaste={onPaste}
              />
              <input hidden className="sr-only" {...getInputProps} />
            </div>
          </div>
          {!!attachments.length && (
            <AttachmentPreviews
              attachments={attachments}
              removeAttachment={removeAttachment}
            />
          )}
        </div>
        <div className="flex w-full justify-end gap-4">
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
            onClick={onSubmit}
            disabled={!input.trim() || isUploading}
            loading={isPending}
          >
            Post
            <SendHorizontal />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
