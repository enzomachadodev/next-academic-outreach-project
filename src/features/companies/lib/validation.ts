import { z } from "zod";

import { idSchema, stringSchema } from "@/lib/validation";

export const upsertCompanySchema = z.object({
  companyId: idSchema.optional(),
  name: stringSchema,
  description: stringSchema,
  image: z.string().url({ message: "Insira uma url válida" }).optional(),
  instagram: stringSchema.optional(),
  website: stringSchema.optional(),
});

export type UpsertCompanySchema = z.infer<typeof upsertCompanySchema>;
