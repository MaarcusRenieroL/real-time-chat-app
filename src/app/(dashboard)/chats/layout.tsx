"use client";

import { useState } from "react";
import { ChatList } from "~/components/dashboard/chats/chat-list";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <>
      <div className="lg:block hidden h-full w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>
            <ChatList
              selectedChat={selectedChat}
              onSelectChat={(chatId) => setSelectedChat(chatId)}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="lg:hidden block h-full w-full">
        {selectedChat ? (
          <div className="h-full w-full">{children}</div>
        ) : (
          <ChatList
            selectedChat={selectedChat}
            onSelectChat={(chatId) => setSelectedChat(chatId)}
          />
        )}
      </div>
    </>
  );
}
