"use client";

import { useState } from "react";

import { Linkify } from "@/components/linkify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UserBioProps {
  content: string;
}

export const UserBio = ({ content }: UserBioProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const characterLimit = 110;

  const truncatedBio =
    content.substring(0, characterLimit).replace(/\n/g, " ") + "...";

  return (
    <>
      <div className="w-full max-w-72 text-wrap text-center text-sm text-muted-foreground 2xl:text-start">
        {truncatedBio}{" "}
        <button
          className="font-semibold text-primary duration-200 hover:underline"
          onClick={() => setIsOpen(true)}
        >
          Read more
        </button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>About me</DialogTitle>
          </DialogHeader>
          <Linkify>
            <article className="mt-2 whitespace-pre-line break-words">
              {content}
            </article>
          </Linkify>
        </DialogContent>
      </Dialog>
    </>
  );
};
