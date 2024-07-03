import { User } from "next-auth";
import { redirect } from "next/navigation";
import { ChatList } from "~/components/dashboard/chat-list";
import { NoChat } from "~/components/dashboard/chat-window/no-chat";
import { auth } from "~/lib/auth";
import { fetchRedis } from "~/lib/helpers/redis";
import { Row } from "~/lib/types";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const friends = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:friends`,
  )) as string[];

  const friendsData = (await Promise.all(
    friends.map(async (senderId) => {
      const sender = JSON.parse(
        await fetchRedis("get", `user:${senderId}`),
      ) as User;
      return {
        senderId: sender.id,
        senderEmail: sender.email,
        senderName: sender.name,
        senderImage: sender.image,
      };
    }),
  )) as Row[];

  return (
    <div className="flex w-full gap-x-5 items-center h-full">
      <ChatList data={friendsData} session={session} />
      <NoChat />
    </div>
  );
}
