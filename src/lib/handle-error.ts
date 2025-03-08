import { APIError as AuthAPIError } from "better-auth/api";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";

export const getErrorMessage = (error: unknown): string => {
  const unknownError = "Something unexpected happened, please try again later.";

  if (error instanceof AuthAPIError) {
    const str = error.message;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (error instanceof ZodError) return "Invalid Fields!";

  if (error instanceof Error) return error.message;

  console.error(error);

  if (isRedirectError(error)) throw error;

  return unknownError;
};
