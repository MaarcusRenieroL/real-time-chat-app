"use client";

import { FC, useEffect, useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ChatListCard } from "./chat-list-card";
import { FilterIcon, MessageSquarePlusIcon, SearchIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Chat } from "~/lib/types";
import { pusherClient } from "~/lib/pusher";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ChatListProps = {
  chats: Chat[];
};

export const ChatList: FC<ChatListProps> = ({ chats: prefetchedChats }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useKindeBrowserClient().getUser();
  const [chats, setChats] = useState(prefetchedChats);
  const router = useRouter();

  const filteredChats = chats.filter((chat) =>
    chat.receiverName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!user?.id) return;
  
    const channel = pusherClient.subscribe(`notifications-${user.id}`);
  
    channel.bind("new-message", (data: { chatId: string; senderName: string; message: string }) => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.chatId === data.chatId
            ? {
                ...chat,
                lastMessage: data.message,
                timestamp: new Date().toISOString(),
              }
            : chat
        )
      );

        toast.info(data.senderName, {
          description: data.message,
          action: {
            label: "View",
            onClick: () => {
              router.push(`/chats/${data.chatId}`);
            }
          }
        });
    });
    
  
    return () => {
      pusherClient.unsubscribe(`notifications-${user.id}`);
    };
  }, [user?.id]);
  
  

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
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="input-09"
              className="peer ps-9 w-full text-sm"
              placeholder="Search for contacts"
              type="email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>
        </div>
        <ScrollArea className="flex-1">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <ChatListCard key={chat.chatId} chat={chat} />
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No chats found.
            </p>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
