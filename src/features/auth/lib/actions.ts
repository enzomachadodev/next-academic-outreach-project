"use server";

import { headers } from "next/headers";
import { cache } from "react";

import { db } from "@/lib/db";
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

    return { success: "Login successful!" };
  } catch (error) {
    console.log(error);
    return {
      error: getErrorMessage(error),
    };
  }
};

export const register = async (input: RegisterSchema) => {
  try {
    const { firstName, lastName, email, password, username } =
      registerSchema.parse(input);

    const emailExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExists)
      throw new Error("Email is already taken. Please try another.");

    const name = `${firstName} ${lastName}`;

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        username,
      },
    });

    return { success: "Account created successfully!" };
  } catch (error) {
    console.log(error);
    return {
      error: getErrorMessage(error),
    };
  }
};

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
});
