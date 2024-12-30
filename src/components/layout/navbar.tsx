import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import React from "react";

import { currentUser } from "@/features/auth/actions/current-user";
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

export const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="bg-white px-5 py-3 shadow-sm">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          LOGO
        </Link>
        <div className="flex items-center gap-5 text-foreground">
          <Link href="/empreendedores">Encontrar Empreendedores</Link>
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
                  <Link href={`/user/${user.id}`}>
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
      </nav>
    </div>
  );
};
