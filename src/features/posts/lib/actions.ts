"use server";

import { getSession } from "@/features/auth/lib/actions";
import { db } from "@/lib/db";

import { getCommentDataInclude, getPostDataInclude } from "../lib/types";
import {
  CreateCommentSchema,
  createCommentSchema,
  CreatePostSchema,
  createPostSchema,
  DeleteCommentSchema,
  deleteCommentSchema,
  DeletePostSchema,
  deletePostSchema,
} from "../lib/validation";

export const submitPost = async (input: CreatePostSchema) => {
  const session = await getSession();

  if (!session) throw Error("Unauthorized");

  const { content, mediaIds } = createPostSchema.parse(input);

  const newPost = await db.post.create({
    data: {
      userId: session.user.id,
      content,
      attachments: {
        connect: mediaIds.map((id) => ({ id })),
      },
    },
    include: getPostDataInclude(session.user.id),
  });

  return newPost;
};

export const deletePost = async (input: DeletePostSchema) => {
  const session = await getSession();

  if (!session) throw Error("Unauthorized");

  const { postId } = deletePostSchema.parse(input);

  const postExists = await db.post.findUnique({
    where: { id: postId },
  });

  if (!postExists) throw new Error("Post not found");

  if (postExists.userId !== session.user.id) throw new Error("Unauthorized");

  const deletedPost = await db.post.delete({
    where: { id: postId },
    include: getPostDataInclude(session.user.id),
  });

  return deletedPost;
};

export const submitComment = async (input: CreateCommentSchema) => {
  const session = await getSession();

  if (!session) throw new Error("Unauthorized!");

  const { user } = session;

  const { content, postId } = createCommentSchema.parse(input);

  const post = await db.post.findUnique({
    where: { id: input.postId },
    select: { userId: true },
  });

  if (!post) throw new Error("Post not found");

  const [newComment] = await db.$transaction([
    db.comment.create({
      data: {
        content,
        postId,
        userId: user.id,
      },
      include: getCommentDataInclude(user.id),
    }),
    ...(post.userId !== user.id
      ? [
          db.notification.create({
            data: {
              issuerId: user.id,
              recipientId: post.userId,
              postId,
              type: "COMMENT",
            },
          }),
        ]
      : []),
  ]);

  return newComment;
};

export async function deleteComment(input: DeleteCommentSchema) {
  const session = await getSession();

  if (!session) throw new Error("Unauthorized!");

  const { user } = session;

  const { commentId } = deleteCommentSchema.parse(input);

  const comment = await db.comment.findUnique({
    where: { id: commentId },
    select: { userId: true },
  });

  if (!comment) throw new Error("Comentário não encontrado");

  if (comment.userId !== user.id) throw new Error("Unauthorized");

  const deletedComment = await db.comment.delete({
    where: { id: commentId },
    include: getCommentDataInclude(user.id),
  });

  return deletedComment;
}
