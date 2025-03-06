import { z } from "zod";

export const stringSchema = z.string().trim().min(1);

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long");

export const idSchema = stringSchema;

export const emailSchema = stringSchema.email();

export const usernameSchema = stringSchema.regex(
  /^[a-zA-Z0-9_-]+$/,
  "Only letters, numbers, - and _ are allowed",
);

export const urlSchema = stringSchema.url();
