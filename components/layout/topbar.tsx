"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HomeIcon, Moon, PenSquare, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export function Topbar() {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-2xl bg-gradient-to-r from-orange-500 to-orange-700 text-transparent bg-clip-text">
              PostHub
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <Button asChild variant="ghost" className="ml-4 hover:bg-orange-200">
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button
            asChild
            variant="default"
            className="ml-4 bg-orange-500 hover:bg-orange-600"
          >
            <Link href="/create">
              <PenSquare className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="ml-2">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
