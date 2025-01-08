import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import React from "react";

import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { logout } from "@/features/auth/actions/logout";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Header = async () => {
  const user = await getCurrentUser();

  return (
    <header className="fixed left-0 top-0 z-10 w-full bg-background px-5 py-3 shadow-sm">
      <div className="relative flex w-full items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          LOGO
        </Link>
        <nav className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-medium hover:text-primary hover:underline"
          >
            Feed
          </Link>
          <Link href="/empresas" className="hover:text-primary hover:underline">
            Empresas
          </Link>
        </nav>
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none">
                <Avatar className="size-10">
                  <AvatarImage src={user.image || ""} alt={user.name || ""} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/perfil`}>
                    <User />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form
                    action={async () => {
                      "use server";
                      await logout();
                    }}
                  >
                    <LogOut className="size-6" /> Sair
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/auth/login">
                <span>Fazer Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
