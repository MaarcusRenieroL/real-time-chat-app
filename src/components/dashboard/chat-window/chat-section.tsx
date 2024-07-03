"use client";

import Image from "next/image";
import { FC, useState } from "react";
import { Message, User } from "~/lib/types";
import { cn } from "~/lib/utils";

type Props = {
  initialMessages: Message[];
  sender: User;
  receiver: User;
};

export const ChatSection: FC<Props> = ({
  initialMessages,
  receiver,
  sender,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  return (
    <div className="flex flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto">
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sender.id;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;

        return (
          <div key={`${message.id}-${message.timeStamp}`}>
            <div
              className={cn("flex items-end", {
                "justify-end": isCurrentUser,
              })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "order-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  },
                )}
              >
                <span
                  className={cn("px-4 py-2 rounded-lg inline-block", {
                    "bg-primary text-white": isCurrentUser,
                    "bg-secondary text-gray-900": !isCurrentUser,
                    "rounded-br-none":
                      !hasNextMessageFromSameUser && isCurrentUser,
                    "rounded-bl-none":
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}
                >
                  {message.text}{" "}
                  <span className="ml-2 text-xs text-gray-400">
                    {new Date(message.timeStamp).toLocaleTimeString()}
                  </span>
                </span>
              </div>
              <div
                className={cn("relative w-6 h-6", {
                  "order-2": isCurrentUser,
                  "order-1": !isCurrentUser,
                  invisible: hasNextMessageFromSameUser,
                })}
              >
                <Image
                  fill
                  src={
                    (isCurrentUser
                      ? (sender.image as string)
                      : receiver.image) ?? ""
                  }
                  alt="Profile picture"
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
