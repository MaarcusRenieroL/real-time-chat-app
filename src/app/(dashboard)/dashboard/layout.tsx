import type { ReactNode } from "react";
import { BottomBar } from "~/components/dashboard/bottom-bar";
import { Sidebar } from "~/components/dashboard/sidebar";
import { auth } from "~/lib/auth";
import { fetchRedis } from "~/lib/helpers/redis";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const friendRequestCount = (
    await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`,
    )
  ).length;

  return (
    <div className="h-screen w-screen lg:p-10 p-4">
      <div className="flex lg:h-full h-[calc(100%_-_100px)] w-full gap-5">
        <Sidebar friendRequestCount={friendRequestCount} />
        <div className="w-full h-full">{children}</div>
      </div>
      <BottomBar friendRequestCount={friendRequestCount} />
    </div>
  );
}
