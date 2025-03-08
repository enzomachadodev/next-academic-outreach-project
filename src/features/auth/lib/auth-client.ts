import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const client = createAuthClient({
  baseURL: process.env.BASE_URL,
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
  plugins: [usernameClient()],
});

export const { signUp, signIn, signOut, useSession } = client;
