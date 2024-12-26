import { FC } from "react";
import { Badge } from "~/components/ui/badge";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PanelsTopLeft, House } from "lucide-react";
import { FriendUserCard } from "./friend-user-card";
import { FriendRequestUserCard } from "./friend-request-user-card";

type friendListProps = {
  friends: any[];
  friendRequests: any[];
  userId: string;
};

export const ContactList: FC<friendListProps> = ({
  friends,
  friendRequests,
  userId,
}) => {
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
              {friends.length}
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
          {friends.map((friend) => {
            const sortedIds = [userId, friend.id].sort();
            const chatId = `${sortedIds[0]}--${sortedIds[1]}`;

            return (
              <FriendUserCard friend={friend} chatId={chatId} key={friend.id} />
            );
          })}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="tab-2">
        <ScrollArea className="h-[calc(100vh-250px)] p-4">
          {friendRequests.map((friend) => (
            <FriendRequestUserCard friend={friend} key={friend.id} />
          ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};
