import { FC } from "react";

import { CameraIcon, MessageSquareIcon, PhoneIcon } from "lucide-react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Friend } from "~/lib/types";

type FriendUserCardProps = {
  friend: Friend;
  chatId: string;
};

export const FriendUserCard: FC<FriendUserCardProps> = ({ friend, chatId }) => {
  return (
    <div
      key={friend.id}
      className="flex items-center space-x-4 p-4 border rounded-lg mt-5 hover:shadow-xl transition-all duration-500"
    >
      <Avatar>
        <AvatarImage src={friend.avatar} alt={friend.name} />
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="font-medium">{friend.name}</p>
        <p className="text-sm text-muted-foreground">{friend.email}</p>
      </div>
      <div className="lg:hidden flex items-center gap-5">
        <Link href={`/chats/${chatId}`}>
          <Button variant="ghost" size="icon">
            <MessageSquareIcon />
          </Button>
        </Link>
        <Button variant="ghost" size="icon">
          <PhoneIcon />
        </Button>
        <Button variant="ghost" size="icon">
          <CameraIcon />
        </Button>
      </div>
      <div className="lg:flex hidden items-center gap-5">
        <Link href={`/chats/${chatId}`}>
          <Button variant="ghost">
            <MessageSquareIcon />
            <span>Message</span>
          </Button>
        </Link>
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
  );
};
