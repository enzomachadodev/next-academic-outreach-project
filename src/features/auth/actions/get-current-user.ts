"use server";

import { User } from "@prisma/client";

import { db } from "@/db";

import { getSession } from "./get-session";

export const getCurrentUser = async (): Promise<User | null> => {
  const session = await getSession();

  if (!session) return null;

  const user = await db.user.findUnique({
    where: {
      id: session.userId,
    },
  });

  return user;
};
