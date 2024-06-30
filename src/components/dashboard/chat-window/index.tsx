import { FC } from "react";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatSection } from "./chat-section";

export const ChatWindow: FC = () => {
  return (
    <div className="rounded-md border-gray-200 p-4 border w-8/12 hidden lg:block h-full">
      <div className="flex flex-col justify-between h-full">
        <ChatHeader />
        <div>
          <ChatSection />
          <ChatInput />
        </div>
      </div>
    </div>
  );
};
