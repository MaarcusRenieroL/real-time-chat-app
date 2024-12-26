"use client";

import { FC } from "react";
import {
  CameraIcon,
  CheckIcon,
  MessageSquareIcon,
  PhoneIcon,
  XIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PanelsTopLeft, House } from "lucide-react";
import { trpc } from "~/server/trpc/client";
import { toast } from "sonner";

type friendListProps = {
  friends: any[];
  friendRequests: any[];
};

export const ContactList: FC<friendListProps> = ({
  friends,
  friendRequests,
}) => {
  const { mutateAsync: acceptFriendRequest } =
    trpc.friend.acceptFriendRequest.useMutation({
      onSuccess: (data) => {
        toast.success("Success", {
          description: data.message,
        });
      },
      onError: (error) => {
        toast.error("Error", {
          description: error.message,
        });
      },
    });

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
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center space-x-4 p-4 border rounded-lg mt-5 hover:shadow-xl transition-all duration-500"
            >
              <Avatar>
                <AvatarImage src={friend.avatar} alt={friend.name} />
                <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{friend.name}</p>
                <p className="text-sm text-muted-foreground">{friend.email}</p>
              </div>
              <div className="lg:hidden flex items-center gap-5">
                <Button variant="ghost" size="icon">
                  <MessageSquareIcon />
                </Button>
                <Button variant="ghost" size="icon">
                  <PhoneIcon />
                </Button>
                <Button variant="ghost" size="icon">
                  <CameraIcon />
                </Button>
              </div>
              <div className="lg:flex hidden items-center gap-5">
                <Button variant="ghost">
                  <MessageSquareIcon />
                  <span>Message</span>
                </Button>
                <Button variant="ghost">
                  <PhoneIcon />
                  <span>Voice Call</span>
                </Button>
                <Button variant="ghost">
                  <CameraIcon />
                  <span>Video Call</span>
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="tab-2">
        <ScrollArea className="h-[calc(100vh-250px)] p-4">
          {friendRequests.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center space-x-4 p-4 border rounded-lg mt-5 hover:shadow-xl transition-all duration-500"
            >
              <Avatar>
                <AvatarImage src={friend.image} alt={friend.name} />
                <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{friend.name}</p>
                <p className="text-sm text-muted-foreground">{friend.email}</p>
              </div>
              <div className="lg:hidden flex items-center gap-5">
                <Button
                  size="icon"
                  onClick={() => acceptFriendRequest({ friendId: friend.id })}
                >
                  <CheckIcon className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon">
                  <XIcon />
                </Button>
              </div>
              <div className="lg:flex hidden items-center gap-5">
                <Button
                  variant="ghost"
                  onClick={() => acceptFriendRequest({ friendId: friend.id })}
                >
                  <CheckIcon className="h-4 w-4" />
                  <span>Accept</span>
                </Button>
                <Button variant="destructive">
                  <XIcon className="h-4 w-4" />
                  <span>Reject</span>
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};
