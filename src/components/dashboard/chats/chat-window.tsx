"use client";

import { FC, useEffect, useRef, useState } from "react";
import { ChatNav } from "../chat/chat-nav";
import { ChatInput } from "../chat/chat-input";
import { MessageList } from "~/lib/types";
import { pusherClient } from "~/lib/pusher";
import { redisDb } from "~/lib/db/redis/db";
import { trpc } from "~/server/trpc/client";

type ChatWindowProps = {
  chatId: string;
  receiverName: string;
  receiverAvatar: string;
  recipientId: string;
  senderId: string;
};

export const ChatWindow: FC<ChatWindowProps> = ({
  chatId,
  receiverName,
  receiverAvatar,
  recipientId,
  senderId,
}) => {
  const [messages, setMessages] = useState<MessageList[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<any>(null);

  const { mutateAsync } = trpc.chat.sendMessage.useMutation();

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesFromRedis = (await redisDb.zrange(chatId, 0, -1)).slice(1);
      setMessages(messagesFromRedis as MessageList[]);
    };

    fetchMessages();

    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`chat-${chatId}`);

      channelRef.current.bind("client-new-message", (data: MessageList) => {

        setMessages((prevMessages) => [...prevMessages, data]);
      });
    } else {
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind_all();
        pusherClient.unsubscribe(`chat-${chatId}`);
        channelRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (newMessageContent: string) => {
    try {
      await mutateAsync({
        chatId: chatId,
        newMessageContent: newMessageContent,
        senderId: senderId,
        recipientId: recipientId,
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start justify-between">
      <ChatNav receiverName={receiverName} receiverAvatar={receiverAvatar} />
      <div className="flex-1 p-4 w-full overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={`${message.senderId}-${message.timestamp}-${message.recipientId}`}
            className={`flex ${
              message.senderId === senderId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                message.senderId === senderId
                  ? "bg-primary text-white dark:text-black"
                  : "bg-secondary"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
