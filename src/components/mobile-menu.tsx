"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  Check,
  LogOut,
  Menu,
  Monitor,
  Moon,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ReactNode, useState } from "react";

import { signOut, useSession } from "@/features/auth/lib/auth-client";
import { cn } from "@/lib/utils";

import { SearchField } from "./search-field";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface SidebarMenuItemProps {
  label: string;
  icon: ReactNode;
  count?: number;
  onClick: () => void;
}

const SidebarMenuItem = ({
  label,
  icon,
  count,
  onClick,
}: SidebarMenuItemProps) => (
  <li
    className="flex w-full cursor-pointer items-center rounded-xl px-2 py-3 duration-300 hover:bg-muted"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      {icon}
      <p className="font-medium">{label}</p>
    </div>
    {count !== undefined && <div className="ml-auto">{count}</div>}
  </li>
);

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <li className="flex w-full cursor-pointer items-center rounded-xl px-2 py-3 duration-300 hover:bg-muted">
          <div className="flex items-center gap-3">
            <Monitor />
            <p className="font-medium">Theme</p>
          </div>
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 size-4" />
          System default
          {theme === "system" && <Check className="ml-2 size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 size-4" />
          Light
          {theme === "light" && <Check className="ml-2 size-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 size-4" />
          Dark
          {theme === "dark" && <Check className="ml-2 size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const MobileMenu = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    toggleMenu();
    queryClient.clear();
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItemHandleClick = (href: string) => {
    toggleMenu();
    router.push(href);
  };

  return (
    <>
      <Button
        className="size-11 lg:hidden"
        variant="outline"
        onClick={toggleMenu}
        aria-label="Open menu"
      >
        <Menu />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-[80%] max-w-96 transform bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-start p-4">
          <Button
            className="size-11"
            variant="outline"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X />
          </Button>
        </div>
        <div className="px-4 py-4">
          <SearchField />
        </div>
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-2 p-2">
            <SidebarMenuItem
              onClick={() => menuItemHandleClick("/notifications")}
              icon={<Bell />}
              label="Notifications"
            />
            <SidebarMenuItem
              onClick={() =>
                menuItemHandleClick(`/profile/${session?.user.username}`)
              }
              icon={<User />}
              label="Profile"
            />
            <SidebarMenuItem
              onClick={() => menuItemHandleClick("/settings")}
              icon={<Settings />}
              label="Settings"
            />
            <ThemeSelector />
            <SidebarMenuItem
              onClick={handleLogout}
              label="Logout"
              icon={<LogOut className="text-destructive" />}
            />
          </ul>
        </nav>
      </div>
    </>
  );
};
