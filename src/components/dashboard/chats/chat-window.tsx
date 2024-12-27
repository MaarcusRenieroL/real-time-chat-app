"use client";

import { FC, useEffect, useRef, useState } from "react";
import { ChatNav } from "../chat/chat-nav";
import { ChatInput } from "../chat/chat-input";
import { MessageList } from "~/lib/types";
import { redisDb } from "~/lib/db/redis/db";

type ChatWindowProps = {
  chatId: string;
  receiverName: string;
  recipientId: string;
  senderId: string;
};

export const ChatWindow: FC<ChatWindowProps> = ({
  chatId,
  receiverName,
  recipientId,
  senderId,
}) => {
  const [messages, setMessages] = useState<MessageList[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setMessages(
        (await redisDb.zrange(chatId, 0, -1)).slice(1) as MessageList[],
      );
    };

    fetchMessages();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (newMessageContent: string) => {
    const newMsg: MessageList = {
      id: Date.now().toString(),
      content: newMessageContent,
      senderId: senderId,
      recipientId: recipientId,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]); // Optimistic update

    try {
      await redisDb.zadd(chatId, {
        score: Date.now(),
        member: JSON.stringify(newMsg),
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally remove the message from state if the call fails
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-start justify-between">
      <ChatNav receiverName={receiverName} />
      <div className="flex-1 p-4 w-full overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
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
                {message.timestamp}
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
