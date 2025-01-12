"use server";

import { cache } from "react";

import { db } from "@/lib/db";

import { getUserDataSelect } from "./types";

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
