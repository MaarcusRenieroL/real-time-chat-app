import { FC } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ChatListCard } from "./chat-list-card";
import { FilterIcon, MessageSquarePlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Chat } from "~/lib/types";

type ChatListProps = {
  chats: Chat[];
};

export const ChatList: FC<ChatListProps> = ({ chats }) => {
  return (
    <div
      className={`
      h-full bg-background border-r border-gray-200 dark:border-gray-800
      flex flex-col
    `}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold">Chats</h2>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <MessageSquarePlusIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <Input placeholder="Search for contacts" className="w-full" />
        <ScrollArea className="flex-1">
          {chats.map((chat) => (
            <ChatListCard key={chat.chatId} chat={chat} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
