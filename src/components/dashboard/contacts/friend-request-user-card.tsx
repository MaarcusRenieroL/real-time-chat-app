"use client";

import { FC } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { trpc } from "~/server/trpc/client";
import { toast } from "sonner";

type FriendRequestUserCardProps = {
  friend: any;
};

export const FriendRequestUserCard: FC<FriendRequestUserCardProps> = ({
  friend,
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
  );
};
