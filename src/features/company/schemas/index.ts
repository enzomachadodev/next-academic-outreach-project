import { z } from "zod";

export const upsertCompanySchema = z.object({
  companyId: z.string().cuid().optional(),
  name: z.string().min(1, "Insira um nome"),
  description: z.string().min(1, "Insira um nome"),
  image: z.string().url({ message: "Insira uma url válida" }).optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
});

export type UpsertCompanySchema = z.infer<typeof upsertCompanySchema>;
