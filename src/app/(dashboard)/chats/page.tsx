"use client";

import { useState } from "react";
import { ChatList } from "~/components/dashboard/chats/chat-list";
import { NoChatWindow } from "~/components/dashboard/chats/no-chat-window";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  return (
    <>
      <div className="lg:block hidden h-full w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>
            <ChatList
              selectedChat={selectedChat}
              onSelectChat={(chatId) => {
                setSelectedChat(chatId);
              }}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <NoChatWindow />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="lg:hidden block h-full w-full">
        <ChatList
          selectedChat={selectedChat}
          onSelectChat={(chatId) => {
            setSelectedChat(chatId);
          }}
        />
      </div>
    </>
  );
}
