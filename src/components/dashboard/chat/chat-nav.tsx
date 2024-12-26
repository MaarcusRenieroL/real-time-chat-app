"use client";

import { FC } from "react";
import { Button } from "~/components/ui/button";
import { ArrowLeft, CameraIcon, PhoneCallIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type ChatNavProps = {
  receiverName: string;
};

export const ChatNav: FC<ChatNavProps> = ({ receiverName }) => {
  const router = useRouter();
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between w-full">
      <div className="flex items-center gap-5">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="">
          <h3 className="text-xl font-bold">{receiverName}</h3>
          <p className="text-sm text-muted-foreground">Last seen at 17:05</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <CameraIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <PhoneCallIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <SearchIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
