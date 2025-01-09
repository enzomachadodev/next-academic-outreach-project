import { z } from "zod";

import { stringSchema } from "@/lib/validation";

export const createPostSchema = z.object({
  content: stringSchema,
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
