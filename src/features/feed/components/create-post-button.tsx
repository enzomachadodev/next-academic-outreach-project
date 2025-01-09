"use client";

import { Calendar, ImageIcon, Pencil, Video } from "lucide-react";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { CreatePostDialog } from "./create-post-dialog";

export const CreatePostButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Card className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <CardContent>
          <div className="mb-6 border-b py-10">
            <p className="text-muted-foreground">
              Sobre o que você quer falar?
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ImageIcon /> <span className="hidden sm:block">Foto</span>
            </div>
            <div className="flex items-center gap-2">
              <Video /> <span className="hidden sm:block">Vídeo</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar /> <span className="hidden sm:block">Evento</span>
            </div>
            <div className="flex items-center gap-2">
              <Pencil /> <span className="hidden sm:block">Artigo</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <CreatePostDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
