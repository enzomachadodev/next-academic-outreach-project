"use client";

import { Loader2, SendHorizonal } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/features/auth/lib/auth-client";
import { UserAvatar } from "@/features/users/components/user-avatar";

import { useSubmitCommentMutation } from "../lib/mutations";
import { PostData } from "../lib/types";

interface CommentInputProps {
  post: PostData;
}

export const CommentInput = ({ post }: CommentInputProps) => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  const mutation = useSubmitCommentMutation(post.id);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!input) return;

    mutation.mutate(
      {
        postId: post.id,
        content: input,
      },
      {
        onSuccess: () => setInput(""),
      },
    );
  }

  return (
    <form className="flex w-full items-center gap-5" onSubmit={onSubmit}>
      <UserAvatar
        name={session?.user.name || ""}
        image={session?.user.image || ""}
        className="size-11"
      />
      <Input
        placeholder="Write a comment..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoFocus
      />
      <Button
        type="submit"
        className="size-11"
        disabled={!input.trim() || mutation.isPending}
      >
        {!mutation.isPending ? (
          <SendHorizonal />
        ) : (
          <Loader2 className="animate-spin" />
        )}
      </Button>
    </form>
  );
};
