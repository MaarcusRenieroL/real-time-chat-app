import { User } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { ChatList } from "~/components/dashboard/chat-list";
import { auth } from "~/lib/auth";
import { fetchRedis } from "~/lib/helpers/redis";
import { Row } from "~/lib/types";

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
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
    <div className="w-full h-full">
      <div className="flex w-full gap-x-5 items-center h-full">
        <ChatList data={friendsData} session={session} />
        <div className="h-full lg:w-8/12 w-full">{children}</div>
      </div>
    </div>
  );
}
