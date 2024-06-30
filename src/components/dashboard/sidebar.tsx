"use client";

import { ChatBubbleIcon, PersonIcon, GearIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { FC } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../mode-toggle";

export const Sidebar: FC = () => {
  const pathname = usePathname();
  return (
    <div className="rounded-md border-gray-200 p-4 border w-20 hidden lg:block h-full">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="space-y-5 flex flex-col items-center justify-between">
          <Link href="/dashboard">
            <Button
              size="icon"
              variant={pathname === "/dashboard" ? "default" : "outline"}
              className="p-2"
            >
              <ChatBubbleIcon className="h-8 w-8" />
            </Button>
          </Link>
          <Link href="/dashboard/friends">
            <Button
              size="icon"
              variant={
                pathname === "/dashboard/friends" ? "default" : "outline"
              }
              className="p-2"
            >
              <PersonIcon className="h-8 w-8" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-between items-center space-y-5">
          <ModeToggle />
          <Link href="/dashboard/settings">
            <Button
              size="icon"
              variant={
                pathname === "/dashboard/friends" ? "default" : "outline"
              }
              className="p-2"
            >
              <GearIcon className="h-8 w-8" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
