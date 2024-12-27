"use client"

import { useEffect } from "react";
import { pusherClient } from "~/lib/pusher";
import { toast } from "sonner"; // Use any notification library
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";
import { CircleCheckIcon, XIcon } from "lucide-react";

export const NotificationListener = () => {
  const router = useRouter();
  const userId = useKindeBrowserClient().getUser()?.id;
  let senderName = "";
  let message = "";
  let chatId = "";

  useEffect(() => {
    const channel = pusherClient.subscribe(`notifications-${userId}`);


    channel.bind("new-message", (data: { chatId: string; senderName: string; message: string }) => {
      chatId = data.chatId;
      senderName = data.senderName;
      message = data.message;
    });

    // Cleanup on unmount
    return () => {
      pusherClient.unsubscribe(`notifications-${userId}`);
    };
  }, [userId]);

  if (chatId && senderName && message) {
    toast.info(`New message from ${senderName}: ${message}`, {
      action: {
        label: "View",
        onClick: () => {
          router.push(`/chats/${chatId}`);
        },
      }
    });
  }

  return null;
};
