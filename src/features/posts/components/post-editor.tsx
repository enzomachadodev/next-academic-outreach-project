"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/features/auth/lib/auth-client";
import { UserAvatar } from "@/features/users/components/user-avatar";

import { useSubmitPostMutation } from "../lib/mutations";

export const PostEditor = () => {
  const { data: session } = useSession();
  const { mutate, isPending } = useSubmitPostMutation();

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
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = () => {
    mutate(
      { content: input },
      {
        onSuccess: () => {
          editor?.commands.clearContent();
          toast.success("Postagem criada com sucesso!");
        },
      },
    );
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
          <EditorContent
            editor={editor}
            className="max-h-60 min-h-14 w-full rounded-md border border-input bg-transparent p-6 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
        </div>
        <div className="flex w-full justify-end">
          <Button
            size="lg"
            onClick={onSubmit}
            disabled={!input.trim()}
            loading={isPending}
          >
            Publicar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
