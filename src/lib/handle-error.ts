import { APIError as AuthAPIError } from "better-auth/api";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";

export const getErrorMessage = (error: unknown): string => {
  const unknownError = "Something unexpected happened, please try again later.";

  if (error instanceof AuthAPIError) return error.message;

  if (error instanceof ZodError) return "Invalid Fields!";

  if (error instanceof Error) return error.message;

  console.error(error);

  if (isRedirectError(error)) throw error;

  return unknownError;
};
