import { redirect } from "next/navigation";
import { NoChatWindow } from "~/components/dashboard/chats/no-chat-window";
import { auth } from "~/lib/auth";
import { server } from "~/server/trpc/server";

export default async function ChatsPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  await server.user.getUserById({ userId: session.user!.id! });

  return <NoChatWindow />;
}
