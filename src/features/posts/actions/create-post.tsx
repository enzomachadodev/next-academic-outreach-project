"use server";

import { db } from "@/db";
import { getSession } from "@/features/auth/actions/get-session";
import { getErrorMessage } from "@/lib/handle-error";

import { CreatePostSchema, createPostSchema } from "../schemas";

export const createPost = async (input: CreatePostSchema) => {
  const session = await getSession();

  if (!session) return { error: "Usuário não autorizado" };

  try {
    const validatedData = createPostSchema.parse(input);

    await db.post.create({
      data: {
        userId: session.userId,
        ...validatedData,
      },
    });

    return { success: "Postagem criada com sucesso!" };
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
