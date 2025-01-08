import { Calendar, Image, Pencil, Plus, Video } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const CreatePost = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer">
          <CardContent>
            <div className="mb-6 border-b py-10">
              <p className="text-muted-foreground">
                Sobre o que você quer falar?
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image /> <span className="hidden sm:block">Foto</span>
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
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center gap-4 border-b pb-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <h4>Enzo de Freitas Machado</h4>
              <p className="text-xs text-muted-foreground">Publicar em Todos</p>
            </div>
          </div>
        </DialogHeader>
        <Textarea
          placeholder="Sobre o que você quer falar?"
          className="min-h-[250px] border-none px-0 shadow-none outline-none focus-visible:ring-0"
        ></Textarea>
        <div className="flex items-center gap-8">
          <Button variant="ghost" size="icon">
            <Image />
          </Button>
          <Button variant="ghost" size="icon">
            <Video />
          </Button>
          <Button variant="ghost" size="icon">
            <Calendar />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus />
          </Button>
        </div>
        <DialogFooter className="border-t pt-6">
          <Button>Publicar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
