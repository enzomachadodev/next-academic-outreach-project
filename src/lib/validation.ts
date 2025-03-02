import { z } from "zod";

export const stringSchema = z.string().trim().min(1, "Campo obrigatório");

export const passwordSchema = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres");

export const idSchema = stringSchema;

export const emailSchema = stringSchema.email("Email inválido");

export const usernameSchema = stringSchema.regex(
  /^[a-zA-Z0-9_-]+$/,
  "Apenas letras, números, - e _ são permitidos",
);

export const urlSchema = stringSchema.url("URL inválida");
