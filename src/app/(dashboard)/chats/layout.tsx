"use client";

import { usePathname } from "next/navigation"; // For accessing the current path
import { ChatList } from "~/components/dashboard/chats/chat-list";
import { NoChatWindow } from "~/components/dashboard/chats/no-chat-window";
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
  const pathname = usePathname(); // Get the current path
  const isChatSelected =
    pathname.startsWith("/chats/") && pathname !== "/chats";

  return (
    <>
      <div className="lg:block hidden h-full w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>
            <ChatList />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={75}>
            {isChatSelected ? children : <NoChatWindow />}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="lg:hidden block h-full w-full">
        {isChatSelected ? (
          <div className="h-full w-full">{children}</div>
        ) : (
          <ChatList />
        )}
      </div>
    </>
  );
}
