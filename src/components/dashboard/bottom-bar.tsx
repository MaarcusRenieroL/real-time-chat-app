"use client";

import { ChatBubbleIcon, PersonIcon, GearIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { FC } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../mode-toggle";

export const BottomBar: FC = () => {
  const pathname = usePathname();
  return (
    <div className="rounded-md border-gray-200 p-4 border w-full lg:hidden block h-20 mt-5 lg:mt-0">
      <div className="space-x-5 flex items-center justify-between">
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
            variant={pathname === "/dashboard/friends" ? "default" : "outline"}
            className="p-2"
          >
            <PersonIcon className="h-8 w-8" />
          </Button>
        </Link>
        <ModeToggle />
        <Link href="/dashboard/settings">
          <Button
            size="icon"
            variant={pathname === "/dashboard/settings" ? "default" : "outline"}
            className="p-2"
          >
            <GearIcon className="h-8 w-8" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
