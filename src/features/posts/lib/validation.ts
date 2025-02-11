import { z } from "zod";

import { idSchema, stringSchema } from "@/lib/validation";

export const createPostSchema = z.object({
  content: stringSchema,
  mediaIds: z.array(z.string()).max(5, "Limite de 5 anexos"),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export const deletePostSchema = z.object({
  postId: idSchema,
});

export type DeletePostSchema = z.infer<typeof deletePostSchema>;
