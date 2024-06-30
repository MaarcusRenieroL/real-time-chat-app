import { FC } from "react";
import { PhoneIcon, CameraIcon, SettingsIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

export const ChatHeader: FC = () => {
  return (
    <div className="rounded-md border-gray-200 border p-2 flex items-center justify-between">
      <div className="flex items-center gap-x-5">
        <Image
          src="/placeholder.svg"
          alt="user-image"
          width={100}
          height={100}
          className="h-10 w-10 object-cover rounded-full"
        />
        <h1 className="text-2xl font-semibold">Chat Header</h1>
      </div>
      <div className="flex items-center gap-x-5">
        <Button variant="outline" size="icon">
          <PhoneIcon className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="icon">
          <CameraIcon className="h-6 w-6" />
        </Button>
        <Button variant="outline" size="icon">
          <SettingsIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
