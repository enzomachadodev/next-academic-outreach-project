import { MediaType } from "@prisma/client";
import { z } from "zod";

export const createPostSchema = z
  .object({
    content: z.string().min(1, "Por favor, preencha o campo acima"),
    media: z.string().url("O campo deve ser uma URL válida").optional(),
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
