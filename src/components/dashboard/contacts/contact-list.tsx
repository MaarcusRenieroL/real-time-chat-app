"use client";

import { FC, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "~/components/ui/badge";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PanelsTopLeft, House } from "lucide-react";
import { FriendUserCard } from "./friend-user-card";
import { FriendRequestUserCard } from "./friend-request-user-card";
import { pusherClient } from "~/lib/pusher";
import { Friend } from "~/lib/types";

type friendListProps = {
  friends: Friend[];
  friendRequests: Friend[];
  userId: string;
};

export const ContactList: FC<friendListProps> = ({
  friends,
  friendRequests: initialFriendRequests,
  userId,
}) => {
  const [friendRequests, setFriendRequests] = useState<Friend[]>(initialFriendRequests);
  const [friendsList, setFriendsList] = useState<Friend[]>(friends);

  useEffect(() => {
    const channel = pusherClient.subscribe(`private-user-${userId}`);

    const handleNewRequest = (data: any) => {
      setFriendRequests((prev) => [...prev, {
        id: data.senderId,
        email: data.senderEmail,
        name: data.senderName,
        avatar: data.senderAvatar,
      }]);
      toast.success(`New friend request from ${data.senderName}`);
    };

    const handleRequestAccepted = (data: any) => {
      setFriendsList((prev) => [
        ...prev,
        { id: data.id, email: data.email, name: data.name, avatar: data.avatar },
      ]);
      setFriendRequests((prev) =>
        prev.filter((request) => request.id !== data.id)
      );
      toast.success(`Your friend request to ${data.name} was accepted!`);
    };

    channel.bind("friend-request", handleNewRequest);
    channel.bind("friend-request-accepted", handleRequestAccepted);

    return () => {
      channel.unbind("friend-request", handleNewRequest);
      channel.unbind("friend-request-accepted", handleRequestAccepted);
      pusherClient.unsubscribe(`private-user-${userId}`);
    };
  }, [userId]);

  return (
    <Tabs defaultValue="tab-1" className="mt-5">
      <ScrollArea>
        <TabsList className="mb-3 h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground w-full">
          <TabsTrigger
            value="tab-1"
            className="w-full relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
          >
            <House
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Friends
            <Badge
              className="ms-1.5 min-w-5 bg-primary/15 px-1"
              variant="secondary"
            >
              {friendsList.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="w-full relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
          >
            <PanelsTopLeft
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Friend Requests
            <Badge
              className="ms-1.5 min-w-5 bg-primary/15 px-1"
              variant="secondary"
            >
              {friendRequests.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <ScrollArea className="h-[calc(100vh-250px)] p-4">
          {friendsList.map((friend) => {
            const sortedIds = [userId, friend.id].sort();
            const chatId = `${sortedIds[0]}--${sortedIds[1]}`;

            return (
              <FriendUserCard friend={friend} chatId={chatId} key={`friend-${userId}-${friend.id}`} />
            );
          })}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="tab-2">
        <ScrollArea className="h-[calc(100vh-250px)] p-4">
          {friendRequests.map((friend) => (
            <FriendRequestUserCard friend={friend} key={`request-${userId}-${friend.id}`} />
          ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};
