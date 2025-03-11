"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ThemeSelectorProps {
  children?: React.ReactNode;
  align?: "start" | "center" | "end";
}

export const ThemeSelector = ({
  children,
  align = "start",
}: ThemeSelectorProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ? (
          children
        ) : (
          <li className="flex w-full cursor-pointer items-center rounded-xl px-2 py-3 duration-300 hover:bg-muted">
            <div className="flex items-center gap-3">
              <Monitor />
              <p className="font-medium">Theme</p>
            </div>
          </li>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
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
