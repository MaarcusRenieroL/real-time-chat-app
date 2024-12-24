import type { FC } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Chat } from "~/lib/types";
import Link from "next/link";

type ChatListCardProps = {
  chat: Chat;
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
};

export const ChatListCard: FC<ChatListCardProps> = ({
  chat,
  selectedChat,
  onSelectChat,
}) => {
  return (
    <Link href={`/chats/${chat.id}`}>
      <Card
        key={chat.id}
        className={`cursor-pointer transition-colors ${
          selectedChat === chat.id ? "bg-primary/10 dark:bg-primary/20" : ""
        }`}
        onClick={() => onSelectChat(chat.id)}
      >
        <CardContent className="p-4 flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatar} alt={chat.name} />
            <AvatarFallback>{chat.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{chat.name}</h3>
              {chat.unreadCount > 0 && (
                <Badge variant="destructive">{chat.unreadCount}</Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {chat.lastMessage}
            </p>
          </div>
          {chat.isActive && (
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};
