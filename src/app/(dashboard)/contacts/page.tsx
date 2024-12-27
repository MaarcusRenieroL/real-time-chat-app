import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SearchIcon } from "lucide-react";
import { AddContactModal } from "~/components/dashboard/contacts/add-contact-modal";
import { ContactList } from "~/components/dashboard/contacts/contact-list";
import { Input } from "~/components/ui/input";
import { User } from "~/lib/types";
import { server } from "~/server/trpc/server";

export default async function ContactsPage() {
  const friends = await server.friend.getFriendsByUserId();
  const friendRequests = await server.friend.getFriendRequestsByUserId();
  const user = await getKindeServerSession().getUser();

  return (
    <div className="p-4 px-8 w-full">
      <div className="w-full flex items-center justify-between gap-5">
        <div className="relative w-full">
          <Input
            className="peer ps-9 w-full text-sm"
            placeholder="Search by name or email"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
        <AddContactModal />
      </div>
      <ContactList
        friends={friends.data as User[] ?? []}
        friendRequests={friendRequests!.data as User[] ?? []}
        userId={user.id}
      />
    </div>
  );
}
