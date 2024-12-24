"use client";

import { FC, useEffect, useRef, useState } from "react";
import { ChatNav } from "../chat/chat-nav";
import { ChatInput } from "../chat/chat-input";

type Message = {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: string;
};

type ChatWindowProps = {
  chatId: string;
  onBack?: () => void;
};

export const ChatWindow: FC<ChatWindowProps> = ({ chatId, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I assist you today?",
      sender: "other",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      content: "I wanted to discuss the project updates.",
      sender: "user",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      content: "Sure, let me pull up the details.",
      sender: "other",
      timestamp: "10:33 AM",
    },
    {
      id: "4",
      content: "Here's the status report from last week.",
      sender: "other",
      timestamp: "10:34 AM",
    },
    {
      id: "5",
      content: "Thanks! Can we focus on the pending tasks?",
      sender: "user",
      timestamp: "10:35 AM",
    },
    {
      id: "6",
      content: "Absolutely. Task A and Task B are still in progress.",
      sender: "other",
      timestamp: "10:36 AM",
    },
    {
      id: "7",
      content: "What are the blockers for Task A?",
      sender: "user",
      timestamp: "10:37 AM",
    },
    {
      id: "8",
      content:
        "The team is waiting on input from the design department, expected by tomorrow.",
      sender: "other",
      timestamp: "10:38 AM",
    },
    {
      id: "9",
      content: "Got it. How about Task B?",
      sender: "user",
      timestamp: "10:39 AM",
    },
    {
      id: "10",
      content:
        "Task B is delayed due to resource constraints. We've allocated additional support to speed it up.",
      sender: "other",
      timestamp: "10:40 AM",
    },
    {
      id: "11",
      content: "Thanks for the update. Let’s aim to finish these by Friday.",
      sender: "user",
      timestamp: "10:41 AM",
    },
    {
      id: "12",
      content: "Will do. I'll ensure the teams are aligned on the deadline.",
      sender: "other",
      timestamp: "10:42 AM",
    },
    {
      id: "13",
      content: "Great! Let me know if there are any further updates.",
      sender: "user",
      timestamp: "10:43 AM",
    },
    {
      id: "14",
      content: "Sure thing. Have a productive day!",
      sender: "other",
      timestamp: "10:44 AM",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (newMessageContent: string) => {
    const newMsg: Message = {
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
