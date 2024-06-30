import { PlusCircledIcon } from "@radix-ui/react-icons";
import { SendIcon } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export const ChatInput: FC = () => {
  return (
    <div className="rounded-md border border-gray-200 p-2 flex items-center justify-between gap-5 mt-5">
      <Button variant="outline" size="icon" className="rounded-full px-2 py-1">
        <PlusCircledIcon className="h-6 w-6" />
      </Button>
      <Input placeholder="Enter message" className="border-none outline-none" />
      <Button variant="outline" size="icon">
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
