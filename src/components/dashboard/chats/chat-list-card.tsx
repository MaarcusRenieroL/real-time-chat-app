import type { FC } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Chat } from "~/lib/types";
import Link from "next/link";

type ChatListCardProps = {
  chat: Chat;
};

const formatTimestamp = (timestamp: string | number | Date): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isToday) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  if (isYesterday) {
    return "Yesterday";
  }

  return date.toLocaleDateString();
};

export const ChatListCard: FC<ChatListCardProps> = ({ chat }) => {
  return (
    <Link href={`/chats/${chat.chatId}`}>
      <Card className="cursor-pointer transition-colors">
        <CardContent className="p-4 flex items-center space-x-4">
          <div className="relative">
            <Avatar>
              <AvatarImage src={chat.imageUrl} alt={chat.receiverName} />
              <AvatarFallback>{chat.receiverName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {/* 
            {chat.isActive && (
              <span className="absolute bottom-0 end-0 size-3 rounded-full border-2 border-background bg-emerald-500">
                <span className="sr-only">Online</span>
              </span>
            )}
            */}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{chat.receiverName}</h3>
              {/*
              {chat.unreadCount > 0 && (
                <Badge variant="destructive">{chat.unreadCount}</Badge>
              )}
              */}
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {chat.lastMessage}
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {formatTimestamp(chat.timestamp)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
