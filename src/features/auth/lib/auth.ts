import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

import { env } from "@/config/env";
import { db } from "@/lib/db";

export const auth = betterAuth({
  appName: env.APP_NAME,
  secret: env.BETTER_AUTH_SECRET,
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
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        return {
          username: profile.login,
        };
      },
    },
  },
});
