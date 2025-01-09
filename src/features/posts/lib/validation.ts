import { MediaType } from "@prisma/client";
import { z } from "zod";

import { stringSchema, urlSchema } from "@/lib/validation";

export const createPostSchema = z
  .object({
    content: stringSchema,
    media: urlSchema.optional(),
    mediaType: z.nativeEnum(MediaType).optional(),
  })
  .refine(
    (data) => {
      if (data.media && !data.mediaType) {
        return false;
      }
      return true;
    },
    {
      message: "O campo mediaType é obrigatório quando media está presente",
      path: ["mediaType"],
    },
  );

export type CreatePostSchema = z.infer<typeof createPostSchema>;
