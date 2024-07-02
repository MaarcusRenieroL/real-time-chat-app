import { redirect } from "next/navigation";
import { AddFriendModal } from "~/components/modals/add-friend-modal";
import { FriendRequestTableShell } from "~/components/table-shell/friend-requests";
import { FriendTableShell } from "~/components/table-shell/friends";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { auth } from "~/lib/auth";
import { fetchRedis } from "~/lib/helpers/redis";

export default async function FriendsPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  const friendRequestIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`,
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    friendRequestIds.map(async (senderId) => {
      const sender = JSON.parse(await fetchRedis("get", `user:${senderId}`));
      return {
        senderId: sender.id,
        senderEmail: sender.email,
        senderName: sender.name,
      };
    }),
  );

  const friends = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:friends`,
  )) as string[];

  const friendsData = await Promise.all(
    friends.map(async (senderId) => {
      const sender = JSON.parse(await fetchRedis("get", `user:${senderId}`));
      return {
        senderId: sender.id,
        senderEmail: sender.email,
        senderName: sender.name,
      };
    }),
  );

  return (
    <div className="rounded-md border border-gray-200 p-4 h-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Friends</h1>
        <AddFriendModal />
      </div>
      <div className="mt-10">
        <Tabs className="w-full" defaultValue="all-friends">
          <TabsList className="w-full">
            <TabsTrigger value="all-friends" className="w-full">
              All Friends
            </TabsTrigger>
            <TabsTrigger value="friend-requests" className="w-full">
              Friend Requests
            </TabsTrigger>
          </TabsList>
          <Separator className="my-5" />
          <TabsContent value="all-friends">
            <FriendTableShell data={friendsData} />
          </TabsContent>
          <TabsContent value="friend-requests">
            <FriendRequestTableShell data={incomingFriendRequests} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
