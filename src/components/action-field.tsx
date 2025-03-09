"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const ActionField = () => {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.email as HTMLInputElement;
    const email = input.value.trim();
    if (!email) return;
    input.value = "";
    router.push(`/register?email=${encodeURIComponent(email)}`);
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/register">
      <div className="flex max-w-lg items-center gap-1 rounded-full border bg-muted p-2 shadow-sm">
        <Input
          name="email"
          type="email"
          placeholder="Enter your email..."
          className="no-focus border-none text-xs shadow-none md:text-lg"
          required
        />
        <Button type="submit">Connect Today!</Button>
      </div>
    </form>
  );
};
