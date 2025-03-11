import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTApi } from "uploadthing/server";

import { env } from "@/config/env";
import { getSession } from "@/features/auth/lib/actions";
import { db } from "@/lib/db";

export const utapi = new UTApi({
  token: env.UPLOADTHING_TOKEN,
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

      if (oldAvatarUrl && oldAvatarUrl.includes("utfs.io")) {
        try {
          const key = oldAvatarUrl.split("/f/")[1];

          if (key) {
            await utapi.deleteFiles(key);
          }
        } catch (error) {
          console.error("Error deleting old avatar", error);
        }
      }

      try {
        await db.user.update({
          where: {
            id: metadata.user.id,
          },
          data: {
            image: file.url,
          },
        });

        return { avatarUrl: file.url };
      } catch (error) {
        console.error("Error during avatar update: ", error);
        throw new Error("An error occurred during avatar update");
      }
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
