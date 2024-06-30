import Image from "next/image";
import { FC } from "react";

export const ChatSection: FC = () => {
  return (
    <div className="flex items-center gap-5">
      <Image
        src="/placeholder.svg"
        className="rounded-full object-cover border h-10 w-10"
        alt="user-image"
        width={100}
        height={100}
      />
      <div className="flex flex-col bg-muted p-2 rounded-xl w-fit">
        <p>Chat Message</p>
        <p className="text-sm">
          {new Date().getHours() + ":" + new Date().getMinutes()}
        </p>
      </div>
    </div>
  );
};
