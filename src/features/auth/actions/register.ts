"use server";

import { getErrorMessage } from "@/lib/handle-error";

import { auth } from "../lib/auth";
import { RegisterSchema, registerSchema } from "../lib/validation";

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
