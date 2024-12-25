"use client";

import { FC, useEffect, useRef, useState } from "react";
import { ChatNav } from "../chat/chat-nav";
import { ChatInput } from "../chat/chat-input";
import { MOCK_MESSAGES } from "~/lib/constants";
import { MessageList } from "~/lib/types";

type ChatWindowProps = {
  chatId: string;
  onBack?: () => void;
};

export const ChatWindow: FC<ChatWindowProps> = ({ chatId, onBack }) => {
  const [messages, setMessages] = useState<MessageList[]>(MOCK_MESSAGES);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (newMessageContent: string) => {
    const newMsg: MessageList = {
      id: Date.now().toString(),
      content: newMessageContent,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prevMessages) => [...prevMessages, newMsg]);
  };

  return (
    <div className="h-full w-full flex flex-col items-start justify-between">
      {onBack && <ChatNav onBack={onBack} />}
      <div className="flex-1 p-4 w-full overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                message.sender === "user"
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
        {/* Scroll Anchor */}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};
