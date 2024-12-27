import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChatWindow } from "~/components/dashboard/chats/chat-window";
import { server } from "~/server/trpc/server";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const sessionUser = await getKindeServerSession().getUser();

  if (!id) {
    return <div>No chat selected</div>;
  }

  const userIds = id.toString().split("--");

  let senderId = "";
  let recipientId = "";

  if (userIds[0] == sessionUser.id) {
    senderId = userIds[0];
    recipientId = userIds[1];
  } else {
    recipientId = userIds[0];
    senderId = userIds[1];
  }

  const user = await server.user.getUserById({ userId: recipientId });

  return (
    <ChatWindow
      chatId={id.toString()}
      receiverName={user.data.name!}
      senderId={senderId}
      recipientId={recipientId}
    />
  );
}
