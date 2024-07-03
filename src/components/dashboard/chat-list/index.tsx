"use client";

import { FC, useEffect, useState } from "react";
import { ChatCard } from "./chat-card";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "~/components/ui/button";
import { Message, Row } from "~/lib/types";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

type Props = {
  data: Row[];
  session: Session;
};

export const ChatList: FC<Props> = ({ data, session }) => {
  const pathname = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathname.includes(session.user.id)) {
      setUnseenMessages((prev) => {
        return prev.filter((message) => !pathname.includes(message?.senderId));
      });
    }
  }, [pathname]);
  return (
    <div
      className={cn(
        "rounded-md border-gray-200 p-4 border lg:w-4/12 w-full h-full",
        pathname.includes("/dashboard/") ? "hidden lg:block" : "block",
      )}
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold">Conversations</h1>
        <Button className="p-2" size="icon" variant="outline">
          <PlusCircledIcon className="h-8 w-8" />
        </Button>
      </div>
      <div className="space-y-5 flex flex-col items-center mt-5">
        {data.sort().map((friend) => {
          const unseenMessagesCount = unseenMessages.filter((unseenMessage) => {
            return unseenMessage.senderId === friend.senderId;
          }).length;

          return (
            <ChatCard
              sessionId={session.user.id}
              key={friend.senderId}
              name={friend.senderName}
              image={friend.senderImage}
              message=""
              id={friend.senderId}
              unseenMessagesCount={unseenMessagesCount}
            />
          );
        })}
      </div>
    </div>
  );
};
