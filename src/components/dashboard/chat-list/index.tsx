import { FC } from "react";
import { ChatCard } from "./chat-card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";

export const ChatList: FC = () => {
  return (
    <div className="rounded-md border-gray-200 p-4 border lg:w-4/12 w-full h-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold">Conversations</h1>
        <Button className="p-2" size="icon" variant="outline">
          <PlusCircledIcon className="h-8 w-8" />
        </Button>
      </div>
      <div className="space-y-5 flex flex-col items-center mt-5">
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </div>
    </div>
  );
};
