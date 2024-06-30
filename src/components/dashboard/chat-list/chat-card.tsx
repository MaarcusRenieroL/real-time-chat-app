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

export const ChatCard: FC = () => {
  return (
    <Link href="/" className="w-full">
      <Card className="w-full hover:shadow-lg duration-500 transition-shadow flex items-center justify-between">
        <CardHeader>
          <div className="flex">
            <Image
              src="/placeholder.svg"
              width={100}
              height={100}
              alt="user-image"
              className="h-10 w-10 object-cover rounded-full border"
            />
            <div className="ml-5">
              <CardTitle>user name</CardTitle>
              <CardDescription>chat message</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-col space-y-1">
            <p className="text-sm">
              {new Date().getHours() + ":" + new Date().getMinutes()}
            </p>
            <p className={cn("border rounded-full px-2 py-1")}>0</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
