import React from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";

interface NavbarProps {
  title: string,
  buttons: JSX.Element[],
}

export function Navbar({ title, buttons }: NavbarProps): JSX.Element {

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex gap-3 flex-1 items-center justify-end">
          {buttons.map((button, index) => (
            <div key={index}>{button}</div>
          ))}
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
