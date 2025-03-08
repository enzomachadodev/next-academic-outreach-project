import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

import { db } from "@/lib/db";

export const auth = betterAuth({
  appName: "Conexão Empreendedora",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  plugins: [username(), nextCookies()],
  user: {
    additionalFields: {
      bio: {
        type: "string",
        required: false,
      },
      pixKey: {
        type: "string",
        required: false,
      },
    },
  },
});
