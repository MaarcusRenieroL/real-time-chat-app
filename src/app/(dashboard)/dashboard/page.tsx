import { ChatList } from "~/components/dashboard/chat-list";

export default function DashboardPage() {
  return (
    <div className="flex w-full gap-x-5 items-center h-full">
      <ChatList />
      <div className="rounded-md border-gray-200 p-4 border w-8/12 hidden lg:block h-full">
        <h1>Chat App</h1>
      </div>
    </div>
  );
}
