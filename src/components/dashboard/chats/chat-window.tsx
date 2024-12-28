"use client";

import { FC, useEffect, useRef, useState } from "react";
import { ChatNav } from "../chat/chat-nav";
import { ChatInput } from "../chat/chat-input";
import { MessageList } from "~/lib/types";
import { pusherClient } from "~/lib/pusher";
import { redisDb } from "~/lib/db/redis/db";
import { trpc } from "~/server/trpc/client";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

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
  const senderAvatar = useKindeBrowserClient().getUser()?.picture ?? "";

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
        {messages.map((message, index) => {
          // Check if the next message is from the same user
          const hasNextMessageFromSameUser =
            messages[index + 1]?.senderId === message.senderId;

          return (
            <div
              key={`${message.senderId}-${message.timestamp}-${message.recipientId}`}
              className={`flex ${
                message.senderId === senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-center gap-3 ${
                  message.senderId === senderId ? "flex-row-reverse" : ""
                }`}
              >
                {/* Profile Picture */}
                <div
                  className={`relative w-6 h-6 rounded-full ${
                    hasNextMessageFromSameUser ? "invisible" : ""
                  }`}
                >
                  <Image
                    src={
                      message.senderId === senderId
                        ? senderAvatar ?? ""
                        : receiverAvatar
                    }
                    alt="Profile picture"
                    className="rounded-full"
                    fill
                  />
                </div>

                {/* Message Bubble */}
                <div
                  className={`px-2 py-1 rounded-3xl max-w-xs flex flex-wrap whitespace-normal items-center gap-5 ${
                    message.senderId === senderId
                      ? "bg-primary text-white dark:text-black rounded-br-none"
                      : "bg-secondary text-black dark:text-white rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
