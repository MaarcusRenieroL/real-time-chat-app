import type { FC } from "react";
import { BsChat } from "react-icons/bs";
import { Button } from "~/components/ui/button";
import { UsersIcon } from "lucide-react";
import { Account } from "./account-nav";

export const Navbar: FC = () => {
  return (
    <header className="h-20 flex items-center justify-between px-10 py-6 border-b">
      <div className="flex items-center gap-5">
        <BsChat className="h-4 w-4" />
        <h1 className="text-2xl font-bold">Chat App</h1>
      </div>
      <div className="flex items-center gap-5">
        <Button size="icon" variant="ghost">
          <UsersIcon className="h-4 w-4" />
        </Button>
        <Account email="email.com" />
      </div>
    </header>
  );
};