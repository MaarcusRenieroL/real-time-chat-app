"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { pusherClient } from "~/lib/pusher";
import { useNotificationStore } from "~/lib/stores/use-notification-store";
import { Chat, User } from "~/lib/types";

type NotificationListenerProps = {
  chats: Chat[];
  friends: User[];
  friendRequests: User[];
};

export const NotificationListener: FC<NotificationListenerProps> = ({
  chats: initialChatList,
  friends,
  friendRequests: initialFriendRequests,
}) => {
  const user = useKindeBrowserClient().getUser();

  const [chats, setChats] = useState(initialChatList);
  const [friendRequests, setFriendRequests] = useState<User[]>(
    initialFriendRequests,
  );
  const [friendsList, setFriendsList] = useState<User[]>(friends);

  const router = useRouter();
  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  ); // Add notification action from the store

  useEffect(() => {
    if (!user) {
      return;
    }

    const channel = pusherClient.subscribe(`notifications-${user.id}`);

    channel.bind(
      "new-message",
      (data: { chatId: string; senderName: string; message: string }) => {
        toast.info(data.senderName, {
          description: data.message,
          action: {
            label: "View",
            onClick: () => {
              router.push(`/chats/${data.chatId}`);
            },
          },
        });
      },
    );

    return () => {
      pusherClient.unsubscribe(`notifications-${user.id}`);
    };
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    const channel = pusherClient.subscribe(`private-user-${user.id}`);

    const handleNewRequest = (data: any) => {
      setFriendRequests((prev) => [
        ...prev,
        {
          id: data.senderId,
          email: data.senderEmail,
          name: data.senderName,
          avatar: data.senderAvatar,
        },
      ]);

      addNotification({
        id: Date.now(), // Unique ID
        image: data.senderAvatar || "", // Optional sender avatar
        user: data.senderName,
        action: "sent you a friend request.",
        target: "",
        timestamp: new Date().toISOString(),
        unread: true,
      });

      toast.info("New Friend Request", {
        description: `${data.senderName} sent you a friend request.`,
      });
    };

    const handleRequestAccepted = (data: any) => {
      setFriendsList((prev) => [
        ...prev,
        {
          id: data.id,
          email: data.email,
          name: data.name,
          avatar: data.avatar,
        },
      ]);
      setFriendRequests((prev) =>
        prev.filter((request) => request.id !== data.id),
      );

      // Add a friend request acceptance notification to the store
      addNotification({
        id: Date.now(), // Unique ID
        image: data.avatar || "", // Optional friend's avatar
        user: data.name,
        action: "accepted your friend request.",
        target: "",
        timestamp: new Date().toISOString(),
        unread: true,
      });

      toast.success(`Your friend request to ${data.name} was accepted!`);
    };

    channel.bind("friend-request", handleNewRequest);
    channel.bind("friend-request-accepted", handleRequestAccepted);

    return () => {
      channel.unbind("friend-request", handleNewRequest);
      channel.unbind("friend-request-accepted", handleRequestAccepted);
      pusherClient.unsubscribe(`private-user-${user.id}`);
    };
  });

  return null;
};
