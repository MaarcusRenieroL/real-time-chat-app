import { redirect } from "next/navigation";
import { ChatWindow } from "~/components/dashboard/chat-window";
import { auth } from "~/lib/auth";
import { fetchRedis } from "~/lib/helpers/redis";
import { Message, User } from "~/lib/types";
import { messageArraySchema } from "~/lib/types/zod-schema";

async function getMessages(chatId: string) {
  try {
    let results: string[] = [];

    results = await fetchRedis("zrange", `chat:${chatId}:messages`, 0, -1);

    if (results.length === 0) {
      const newChatId = chatId.split("--").reverse().join("--");

      results = await fetchRedis("zrange", `chat:${newChatId}:messages`, 0, -1);
    }

    const dbMessages = results
      .map((message) => JSON.parse(message) as Message)
      .reverse();
    const messages = messageArraySchema.parse(dbMessages);

    return messages;
  } catch (error) {
    console.log(Error);
  }
}

export default async function SenderPage({
  params,
}: {
  params: { chatId: string };
}) {
  const ids = params.chatId.split("--");

  //
  // const user = JSON.parse(await fetchRedis("get", `user:${senderId}`));
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  let sender: User;
  let receiver: User;

  sender = JSON.parse(
    await fetchRedis("get", `user:${session.user.id}`),
  ) as User;

  if (sender.id === ids[0]) {
    receiver = JSON.parse(await fetchRedis("get", `user:${ids[1]}`)) as User;
  } else {
    receiver = JSON.parse(await fetchRedis("get", `user:${ids[0]}`)) as User;
  }

  const isFriendOfSender = await fetchRedis(
    "sismember",
    `user:${sender.id}:friends`,
    receiver.id,
  );
  const isFriendOfReceiver = await fetchRedis(
    "sismember",
    `user:${receiver.id}:friends`,
    sender.id,
  );

  if (!isFriendOfSender || !isFriendOfReceiver) {
    redirect("/dashboard");
  }

  const initialMessages = await getMessages(params.chatId);

  return (
    <ChatWindow
      chatId={params.chatId}
      sender={sender}
      receiver={receiver}
      initialMessages={initialMessages ?? []}
    />
  );
}
