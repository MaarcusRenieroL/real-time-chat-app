import { ChatList } from "~/components/dashboard/chats/chat-list";
import { NoChatWindow } from "~/components/dashboard/chats/no-chat-window";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

export default function ChatsPage() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25}>
        <ChatList />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <NoChatWindow />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
