"use server";

import { getErrorMessage } from "@/lib/handle-error";

import { auth } from "../lib/auth";
import { LoginSchema, loginSchema } from "../lib/validation";

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
