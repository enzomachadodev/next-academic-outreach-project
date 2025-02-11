import { X } from "lucide-react";
import Image from "next/image";

import { Attachment } from "@/hooks/use-media-upload";
import { cn } from "@/lib/utils";

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

export const AttachmentPreviews = ({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map(({ file, isUploading }) => {
        const src = URL.createObjectURL(file);

        return (
          <div
            key={file.name}
            className={cn(
              "relative mx-auto size-fit",
              isUploading && "opacity-50",
            )}
          >
            {file.type.startsWith("image") ? (
              <Image
                src={src}
                alt="Attachment preview"
                width={500}
                height={500}
                className="size-fit max-h-[30rem] rounded-2xl"
              />
            ) : (
              <video controls className="size-fit max-h-[30rem] rounded-2xl">
                <source src={src} type={file.type} />
              </video>
            )}
            {!isUploading && (
              <button
                onClick={() => removeAttachment(file.name)}
                className="absolute right-3 top-3 rounded-full bg-foreground p-1.5 text-background transition-colors hover:bg-foreground/60"
              >
                <X size={20} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
