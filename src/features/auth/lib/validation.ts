import { z } from "zod";

import { emailSchema, passwordSchema, stringSchema } from "@/lib/validation";

export const loginSchema = z.object({
  email: emailSchema,
  password: stringSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: stringSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
