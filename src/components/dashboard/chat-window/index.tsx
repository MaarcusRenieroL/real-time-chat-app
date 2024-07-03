import { FC } from "react";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatSection } from "./chat-section";
import { Message, User } from "~/lib/types";

type Props = {
  sender: User;
  receiver: User;
  initialMessages: Message[];
  chatId: string;
};

export const ChatWindow: FC<Props> = ({
  initialMessages,
  chatId,
  sender,
  receiver,
}) => {
  return (
    <div className="rounded-md border-gray-200 p-4 border h-full w-full block">
      <div className="flex flex-col justify-between h-full">
        <ChatHeader
          userName={receiver.name ?? ""}
          imageUrl={receiver.image ?? ""}
        />
        <div>
          <ChatSection
            initialMessages={initialMessages}
            sender={sender}
            receiver={receiver}
          />
          <ChatInput userName={receiver.name} chatId={chatId} />
        </div>
      </div>
    </div>
  );
};
