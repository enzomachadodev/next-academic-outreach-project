"use server";

import { headers } from "next/headers";
import { cache } from "react";

import { getErrorMessage } from "@/lib/handle-error";

import { auth } from "../lib/auth";
import {
  LoginSchema,
  loginSchema,
  RegisterSchema,
  registerSchema,
} from "../lib/validation";

export const login = async (input: LoginSchema) => {
  try {
    const { email, password } = loginSchema.parse(input);

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { success: "Login efetuado com sucesso!" };
  } catch (error) {
    console.log(error);
    return {
      error: getErrorMessage(error),
    };
  }
};

export const register = async (input: RegisterSchema) => {
  try {
    const validatedFields = registerSchema.parse(input);

    await auth.api.signUpEmail({
      body: validatedFields,
    });

    return { success: "Conta criada com sucesso!" };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session;
});
