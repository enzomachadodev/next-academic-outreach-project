import { z } from "zod";

import { idSchema, stringSchema } from "@/lib/validation";

export const createPostSchema = z.object({
  content: stringSchema,
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const deletePostSchema = z.object({
  postId: idSchema,
});

export type DeletePostSchema = z.infer<typeof deletePostSchema>;
