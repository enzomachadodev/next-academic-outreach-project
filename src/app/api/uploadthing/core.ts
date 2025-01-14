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
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;
