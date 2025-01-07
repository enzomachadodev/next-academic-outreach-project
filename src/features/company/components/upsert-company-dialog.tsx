import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import React, { useState, useTransition } from "react";
import { Form, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormStatus } from "@/components/ui/form-status";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { upsertCompany } from "../actions/upsert-company";
import { UpsertCompanySchema, upsertCompanySchema } from "../schemas";

interface UpsertCompanyDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  companyId: string;
  defaultValues: UpsertCompanySchema;
}

export const UpsertCompanyDialog = ({
  isOpen,
  setIsOpen,
  companyId,
  defaultValues,
}: UpsertCompanyDialogProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const form = useForm<UpsertCompanySchema>({
    resolver: zodResolver(upsertCompanySchema),
    disabled: isPending,
    defaultValues,
  });

  const onSubmit = async (values: UpsertCompanySchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      upsertCompany({ ...values, companyId }).then((data) => {
        if (data?.error) {
          return setError(data?.error);
        }
        if (data?.success) {
          form.reset();
          setSuccess(data?.success);

          setTimeout(() => {
            return redirect("/");
          }, 2000);
        }
      });
    });
  };

  const isUpdate = Boolean(companyId);

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isUpdate
              ? "Atualize as Informações da Sua Empresa"
              : "Cadastre Sua Empresa"}
          </DialogTitle>
          <DialogDescription>Preencha os campos abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Amazon, Google..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fale Sobre Sua Empresa</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A empresa é sobre..."
                      disabled={isPending}
                      {...field}
                    ></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram da Empresa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="@minhaempresa"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {success && <FormStatus type="success" message={success} />}
            {error && <FormStatus type="error" message={error} />}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isUpdate ? "Salvar Informações" : "Cadastrar Empresa"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
