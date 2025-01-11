"use server";

import { db } from "@/db";
import { getSession } from "@/features/auth/actions/get-session";

import { postDataInclude } from "../lib/types";
import {
  CreatePostSchema,
  createPostSchema,
  DeletePostSchema,
  deletePostSchema,
} from "../lib/validation";

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

export const deletePost = async (input: DeletePostSchema) => {
  const session = await getSession();

  if (!session) throw Error("Não autorizado");

  const { postId } = deletePostSchema.parse(input);

  const postExists = await db.post.findUnique({
    where: { id: postId },
  });

  if (!postExists) throw new Error("Post não encontrado");

  if (postExists.userId !== session.userId) throw new Error("Não autorizado");

  const deletedPost = await db.post.delete({
    where: { id: postId },
    include: postDataInclude,
  });

  return deletedPost;
};
