import { Media } from "@prisma/client";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface MediaPreviewsProps {
  attachments: Media[];
}

export const MediaPreviews = ({ attachments }: MediaPreviewsProps) => {
  return (
    <div
      className={cn(
        "mt-4 flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((media) => {
        if (media.type === "IMAGE") {
          return (
            <Image
              key={media.id}
              src={media.url}
              alt="Attachment"
              width={500}
              height={500}
              className="mx-auto size-fit max-h-[30rem] rounded-2xl"
            />
          );
        }

        if (media.type === "VIDEO") {
          return (
            <div key={media.id}>
              <video
                src={media.url}
                controls
                className="mx-auto size-fit max-h-[30rem] rounded-2xl"
              />
            </div>
          );
        }

        return (
          <p key={media.id} className="text-destructive">
            Unsupported media type
          </p>
        );
      })}
    </div>
  );
};
