"use client";

import { FC, useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Chat } from "~/lib/types";
import { MOCK_CHATS } from "~/lib/constants";
import { ChatListCard } from "./chat-list-card";
import { FilterIcon, MessageSquarePlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type SidebarProps = {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
};

export const ChatList: FC<SidebarProps> = ({ selectedChat, onSelectChat }) => {
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS);

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
          {chats.map((chat: Chat) => (
            <ChatListCard
              key={chat.id}
              chat={chat}
              onSelectChat={onSelectChat}
              selectedChat={selectedChat}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};
