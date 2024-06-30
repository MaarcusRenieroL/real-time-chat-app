import { ChatList } from "~/components/dashboard/chat-list";
import { ChatWindow } from "~/components/dashboard/chat-window";

export default function DashboardPage() {
  return (
    <div className="flex w-full gap-x-5 items-center h-full">
      <ChatList />
      <ChatWindow />
    </div>
  );
}
