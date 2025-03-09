"use client";

import { useDropzone } from "@uploadthing/react";
import { Loader2, Paperclip, SendHorizontal } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

import { TipTapEditor, TipTapEditorRef } from "@/components/tip-tap-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaUpload } from "@/hooks/use-media-upload";

import { useSubmitPostMutation } from "../lib/mutations";
import { AddAttachmentsButton } from "./add-attachments-button";
import { AttachmentPreviews } from "./attachments-preview";

export const PostEditor = () => {
  const { mutate, isPending } = useSubmitPostMutation();
  const editorRef = useRef<TipTapEditorRef>(null);

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

  const onSubmit = () => {
    const content = editorRef.current?.getText() || "";

    mutate(
      {
        content,
        mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
      },
      {
        onSuccess: () => {
          editorRef.current?.clearContent();
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
              <TipTapEditor
                ref={editorRef}
                placeholder="What's on your mind right now?"
                isDragActive={isDragActive}
                onPaste={onPaste}
                disabled={isPending}
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
            disabled={!editorRef.current?.getText().trim() || isUploading}
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
