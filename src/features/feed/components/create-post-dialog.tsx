"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, ImageIcon, Plus, Video } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { createPost } from "../actions/create-post";
import { CreatePostSchema, createPostSchema } from "../schemas";

interface CreatePostDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const CreatePostDialog = ({
  isOpen,
  setIsOpen,
}: CreatePostDialogProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    disabled: isPending,
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: CreatePostSchema) => {
    startTransition(() => {
      createPost({ ...values }).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          form.reset();
          toast.success(data?.success);
          setIsOpen(false);
        }
      });
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger></DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogTitle className="hidden">Criação de Postagem</DialogTitle>
        <DialogDescription className="hidden">
          Modal com formuário para criação de postagem
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <div className="flex items-center gap-4 border-b pb-6">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="">
                  <h4>Enzo de Freitas Machado</h4>
                  <p className="text-xs text-muted-foreground">
                    Publicar em Todos
                  </p>
                </div>
              </div>
            </DialogHeader>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Sobre o que você quer falar?"
                      className="min-h-[250px] border-none px-0 shadow-none outline-none focus-visible:ring-0"
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-8">
              <Button variant="ghost" size="icon" type="button">
                <ImageIcon />
              </Button>
              <Button variant="ghost" size="icon" type="button">
                <Video />
              </Button>
              <Button variant="ghost" size="icon" type="button">
                <Calendar />
              </Button>
              <Button variant="ghost" size="icon" type="button">
                <Plus />
              </Button>
            </div>
            <DialogFooter className="border-t pt-6">
              <Button type="submit" disabled={isPending}>
                Publicar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
