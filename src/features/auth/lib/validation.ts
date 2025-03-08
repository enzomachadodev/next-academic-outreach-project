import { z } from "zod";

import {
  emailSchema,
  passwordSchema,
  stringSchema,
  usernameSchema,
} from "@/lib/validation";

export const loginSchema = z.object({
  email: emailSchema,
  password: stringSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: stringSchema,
  lastName: stringSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
