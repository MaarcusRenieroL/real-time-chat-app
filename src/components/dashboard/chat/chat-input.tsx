"use client";

import { FC, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Smile, Paperclip, Mic, Send } from "lucide-react";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 p-4 w-full">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Smile className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 text-sm"
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Mic className="h-5 w-5" />
        </Button>
        <Button onClick={handleSendMessage}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
