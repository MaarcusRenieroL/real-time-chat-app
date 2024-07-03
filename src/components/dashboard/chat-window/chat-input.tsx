"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { SendIcon } from "lucide-react";
import { FC, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  userName: string;
  chatId: string;
};

export const ChatInput: FC<Props> = ({ userName, chatId }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    setIsLoading(true);

    try {
      await axios.post("http://localhost:3000/api/message/send", {
        text: input,
        chatId,
      });
      setInput("");
      textareaRef.current?.focus();
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-md border border-gray-200 p-2 flex items-center justify-between gap-5 mt-5">
      <Button variant="outline" size="icon" className="rounded-full px-2 py-1">
        <PlusCircledIcon className="h-6 w-6" />
      </Button>
      <TextareaAutosize
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        onChange={(e) => setInput(e.target.value)}
        rows={1}
        placeholder={`Message ${userName}`}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Button
        variant="outline"
        size="icon"
        disabled={isLoading}
        onClick={sendMessage}
      >
        <SendIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
