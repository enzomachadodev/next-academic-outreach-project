"use server";

import { getErrorMessage } from "@/lib/handle-error";

import { auth } from "../lib/auth";
import { RegisterSchema, registerSchema } from "../schemas";

export const register = async (input: RegisterSchema) => {
  try {
    const { name, email, password } = registerSchema.parse(input);

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return { success: "Conta criada com sucesso!" };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
