import { ChatLayout } from "~/components/dashboard/chat-layout";
import { server } from "~/server/trpc/server";

export default async function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchedChats = await server.user.getChatsByUserId();

  return <ChatLayout chats={fetchedChats.data}>{children}</ChatLayout>;
}
