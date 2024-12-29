import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Insira um email")
    .email({ message: "Insira um email válido" }),
  password: z.string().min(1, "Insira uma senha"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(1, "Insira um nome"),
  email: z
    .string()
    .min(1, "Insira um email")
    .email({ message: "Insira um email válido" }),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
