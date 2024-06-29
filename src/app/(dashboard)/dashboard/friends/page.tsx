import { AddFriendModal } from "~/components/modals/add-friend-modal";
import { FriendTableShell } from "~/components/table-shell/friends";

export default function FriendsPage() {
  return (
    <div className="">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Friends</h1>
        <AddFriendModal />
      </div>
      <div className="mt-10">
        <FriendTableShell />
      </div>
    </div>
  );
}
