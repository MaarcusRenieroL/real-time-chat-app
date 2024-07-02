import { AddFriendModal } from "~/components/modals/add-friend-modal";
import { FriendRequestTableShell } from "~/components/table-shell/friend-requests";
import { FriendTableShell } from "~/components/table-shell/friends";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function FriendsPage() {
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
            <FriendTableShell />
          </TabsContent>
          <TabsContent value="friend-requests">
            <FriendRequestTableShell />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
