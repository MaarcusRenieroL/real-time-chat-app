import type { FC } from "react";
import { BsChat } from "react-icons/bs";
import { Button } from "~/components/ui/button";
import { MessageSquareIcon, UsersIcon } from "lucide-react";
import { Account } from "./account-nav";
import { ModeToggle } from "~/components/mode-toggle";
import Link from "next/link";

export const Navbar: FC = () => {
  return (
    <header className="h-20 flex items-center justify-between px-10 py-6 border-b">
      <div className="flex items-center gap-5">
        <BsChat className="h-4 w-4" />
        <h1 className="text-2xl font-bold">Chat App</h1>
      </div>
      <div className="flex items-center gap-5">
        <Link href="/chats">
          <Button size="icon" variant="ghost">
            <MessageSquareIcon className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/contacts">
          <Button size="icon" variant="ghost">
            <UsersIcon className="h-4 w-4" />
          </Button>
        </Link>
        <ModeToggle />
        <Account email="email.com" />
      </div>
    </header>
  );
};
