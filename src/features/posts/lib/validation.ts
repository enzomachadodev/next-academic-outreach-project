import { z } from "zod";

import { idSchema, stringSchema } from "@/lib/validation";

export const createPostSchema = z.object({
  content: stringSchema,
  mediaIds: z.array(z.string()).max(5, "Limite de 5 anexos"),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const deletePostSchema = z.object({
  postId: z.string(),
});

export type DeletePostSchema = z.infer<typeof deletePostSchema>;

export const createCommentSchema = z.object({
  postId: idSchema,
  content: stringSchema,
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;

export const deleteCommentSchema = z.object({
  commentId: z.string(),
});

export type DeleteCommentSchema = z.infer<typeof deleteCommentSchema>;
