"use client";

import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { ChatList } from "~/components/dashboard/chats/chat-list";
import { NoChatWindow } from "~/components/dashboard/chats/no-chat-window";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { Chat } from "~/lib/types";

type ChatLayoutProps = {
  children: ReactNode;
  chats: Chat[];
};

export const ChatLayout: FC<ChatLayoutProps> = ({ children, chats }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="lg:block hidden h-full w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>
            <ChatList chats={chats} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={75}>
            {children || <NoChatWindow />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="lg:hidden block h-full w-full">
        {pathname === "/chats" ? <ChatList chats={chats} /> : children}
      </div>
    </>
  );
};

