import { z } from "zod";

import { stringSchema } from "@/lib/validation";

export const updateUserProfileSchema = z.object({
  name: stringSchema,
  bio: stringSchema,
});

export type UpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
