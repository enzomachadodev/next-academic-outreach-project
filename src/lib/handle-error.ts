import { APIError as AuthAPIError } from "better-auth/api";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";

import { AUTH_API_ERROR_CODES } from "@/features/auth/constants/error-codes";

export const getErrorMessage = (error: unknown): string => {
  const unknownError = "Algo inesperado aconteceu, tente novamente mais tarde.";

  if (error instanceof AuthAPIError) {
    const code = error.body?.code;
    return code ? AUTH_API_ERROR_CODES[code] : unknownError;
  }

  if (error instanceof ZodError) {
    return "Dados inválidos!";
  }

  if (error instanceof Error) return error.message;

  console.error(error);

  if (isRedirectError(error)) throw error;

  return unknownError;
};
