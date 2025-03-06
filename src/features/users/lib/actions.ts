"use server";

import { cache } from "react";

import { getSession } from "@/features/auth/lib/actions";
import { db } from "@/lib/db";

import { getUserDataSelect } from "./types";
import {
  UpdateUserProfileSchema,
  updateUserProfileSchema,
} from "./validations";

export const getUser = cache(
  async (username: string, loggedInUserId?: string) => {
    const user = await db.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
      select: getUserDataSelect(loggedInUserId),
    });

    return user;
  },
);

export const updateUserProfile = async (input: UpdateUserProfileSchema) => {
  const session = await getSession();

  if (!session) throw Error("Unauthorized");

  const validatedFields = updateUserProfileSchema.parse(input);

  const updatedUser = await db.user.update({
    where: { id: session.user.id },
    data: validatedFields,
    select: getUserDataSelect(session.user.id),
  });

  return updatedUser;
};
