"use server";

import { db } from "@/db";
import { getSession } from "@/features/auth/actions/get-session";

import { postDataInclude } from "../lib/types";
import { CreatePostSchema, createPostSchema } from "../lib/validation";

export const submitPost = async (input: CreatePostSchema) => {
  const session = await getSession();

  if (!session) throw Error("Não autorizado");

  const validatedFields = createPostSchema.parse(input);

  const newPost = await db.post.create({
    data: {
      ...validatedFields,
      userId: session.userId,
    },
    include: postDataInclude,
  });

  return newPost;
};
