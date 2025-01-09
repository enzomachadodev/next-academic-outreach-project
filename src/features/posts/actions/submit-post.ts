"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { getSession } from "@/features/auth/actions/get-session";
import { getErrorMessage } from "@/lib/handle-error";

import { CreatePostSchema, createPostSchema } from "../lib/validation";

export const submitPost = async (input: CreatePostSchema) => {
  const session = await getSession();

  if (!session) throw Error("Não autorizado");

  try {
    const validatedFields = createPostSchema.parse(input);

    await db.post.create({
      data: {
        ...validatedFields,
        userId: session.userId,
      },
    });

    revalidatePath("/feed");
  } catch (error) {
    return getErrorMessage(error);
  }
};
