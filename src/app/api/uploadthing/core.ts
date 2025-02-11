import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

import { getSession } from "@/features/auth/lib/actions";
import { db } from "@/lib/db";

export const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
  defaultKeyType: "fileKey",
});

const f = createUploadthing();

export const fileRouter = {
  avatar: f({
    image: {
      maxFileSize: "512KB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getSession();

      if (!session) throw new UploadThingError("Unauthorized");

      return { user: session.user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const oldAvatarUrl = metadata.user.image;

      if (oldAvatarUrl) {
        const key = oldAvatarUrl.split("/f/")[1];

        await utapi.deleteFiles(key);
      }

      await db.user.update({
        where: {
          id: metadata.user.id,
        },
        data: {
          image: file.url,
        },
      });

      return { avatarUrl: file.url };
    }),

  attachment: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 5,
    },
    video: {
      maxFileSize: "32MB",
      maxFileCount: 5,
    },
  })
    .middleware(async () => {
      const session = await getSession();

      if (!session) throw new UploadThingError("Unauthorized");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ file }) => {
      const media = await db.media.create({
        data: {
          url: file.url,
          type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
        },
      });

      return { mediaId: media.id };
    }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
