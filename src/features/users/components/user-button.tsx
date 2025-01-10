"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  Check,
  LogOutIcon,
  Monitor,
  Moon,
  Settings,
  Sun,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/actions/logout";
import { useSession } from "@/features/auth/lib/auth-client";

import { UserAvatar } from "./user-avatar";

interface UserButtonProps {
  className?: string;
}

export const UserButton = ({ className }: UserButtonProps) => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-none">
        <button className={className}>
          <UserAvatar
            name={session?.user.name || ""}
            image={session?.user.image || ""}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Logado como {session?.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Perfil
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 size-4" />
                System default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <Link href="/settings">
          <DropdownMenuItem>
            <Settings className="mr-2 size-4" /> Configurações
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="mr-2 size-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
