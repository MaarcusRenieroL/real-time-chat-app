import { AddFriendModal } from "~/components/modals/add-friend-modal";

export default function FriendsPage() {
  return (
    <div className="">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Friends</h1>
        <AddFriendModal />
      </div>
    </div>
  );
}
