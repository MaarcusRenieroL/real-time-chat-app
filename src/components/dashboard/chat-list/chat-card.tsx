import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

type Props = {
  id: string;
  name: string;
  message: string;
  image: string;
  sessionId: string;
  unseenMessagesCount: number;
};

export const ChatCard: FC<Props> = ({
  id,
  name,
  message,
  image,
  unseenMessagesCount,
  sessionId,
}) => {
  const sortedIds = [sessionId, id].sort();
  const chatId = `${sortedIds[0]}--${sortedIds[1]}`;

  return (
    <Link href={`/dashboard/${chatId}`} className="w-full">
      <Card className="w-full hover:shadow-lg duration-500 transition-shadow flex items-center justify-between">
        <CardHeader>
          <div className="flex">
            <Image
              src={image}
              width={100}
              height={100}
              alt="user-image"
              className="h-10 w-10 object-cover rounded-full border"
            />
            <div className="ml-5">
              <CardTitle>{name}</CardTitle>
              <CardDescription>{message}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-col space-y-1">
            <p className="text-sm">
              {new Date().getHours() + ":" + new Date().getMinutes()}
            </p>
            <p
              className={cn(
                "border rounded-full px-2 py-1",
                unseenMessagesCount > 0 ? "bg-black text-white" : "hidden",
              )}
            >
              {unseenMessagesCount}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
