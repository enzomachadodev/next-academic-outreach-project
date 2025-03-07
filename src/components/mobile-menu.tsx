"use client";

import {
  Bell,
  Check,
  Menu,
  Monitor,
  Moon,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ReactNode, useState } from "react";

import { useSession } from "@/features/auth/lib/auth-client";
import { cn } from "@/lib/utils";

import { MobileLogoutButton } from "./mobile-logout-button";
import { SearchField } from "./search-field";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface SidebarMenuItemProps {
  href: string;
  label: string;
  icon: ReactNode;
  count?: number;
}

const SidebarMenuItem = ({
  href,
  label,
  icon,
  count,
}: SidebarMenuItemProps) => (
  <Link href={href}>
    <li className="flex w-full items-center rounded-xl px-2 py-3 duration-300 hover:bg-muted">
      <div className="flex items-center gap-3">
        {icon}
        <p className="font-medium">{label}</p>
      </div>
      <div>{count}</div>
    </li>
  </Link>
);

export const MobileMenu = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        className="size-11 lg:hidden"
        variant="outline"
        onClick={toggleMenu}
      >
        <Menu />
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleMenu}
        ></div>
      )}

      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-[80%] max-w-96 transform bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col justify-between gap-4">
          <div>
            <Button
              className="m-4 size-11"
              variant="outline"
              onClick={toggleMenu}
            >
              <X />
            </Button>
            <ul className="flex flex-col gap-2 p-2">
              <SearchField />
              <SidebarMenuItem
                href="/notifications"
                icon={<Bell />}
                label="Notifications"
              />
              <SidebarMenuItem
                href={`/profile/${session?.user.username}`}
                icon={<User />}
                label="Profile"
              />
              <SidebarMenuItem href="" icon={<Settings />} label="Settings" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <SidebarMenuItem href="" icon={<Monitor />} label="Theme" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
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
                </DropdownMenuContent>
              </DropdownMenu>
            </ul>
          </div>
          <MobileLogoutButton />
        </div>
      </div>
    </>
  );
};
