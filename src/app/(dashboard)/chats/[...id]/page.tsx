import { ChatWindow } from "~/components/dashboard/chats/chat-window";
import { auth } from "~/lib/auth";
import { server } from "~/server/trpc/server";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const session = await auth();

  if (!id) {
    return <div>No chat selected</div>;
  }

  const userIds = id.toString().split("--");

  let senderId = "";
  let recipientId = "";

  if (userIds[0] == session!.user.id) {
    senderId = userIds[0];
    recipientId = userIds[1];
  } else {
    recipientId = userIds[0];
    senderId = userIds[1];
  }

  const user = await server.user.getUserById({ userId: recipientId });

  return <ChatWindow chatId={id} receiverName={user.data.name!} />;
}
