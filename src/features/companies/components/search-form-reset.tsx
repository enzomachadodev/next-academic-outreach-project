"use client";

import { X } from "lucide-react";
import Link from "next/link";

export const SearchFormReset = () => {
  const reset = () => {
    const form = document.getElementById("search-form") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button
      type="reset"
      onClick={reset}
      className="flex size-[50px] items-center justify-center rounded-full bg-foreground text-background"
    >
      <Link href="/empreendedores">
        <X />
      </Link>
    </button>
  );
};
