import {
  CameraIcon,
  MessageSquareIcon,
  PhoneIcon,
  SearchIcon,
  UserPlusIcon,
} from "lucide-react";
import { AddContactModal } from "~/components/dashboard/contacts/add-contact-modal";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { MOCK_CONTACTS } from "~/lib/constants";

export default function ContactsPage() {
  return (
    <div className="p-4 px-8 w-full">
      <div className="w-full flex items-center justify-between gap-5">
        <div className="relative w-full">
          <Input
            className="peer ps-9 w-full"
            placeholder="Search by name or email"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
        <AddContactModal />
      </div>
      <ScrollArea className="h-[calc(100vh-250px)] p-4 mt-5">
        {MOCK_CONTACTS.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center space-x-4 py-2 px-4 border rounded-lg mt-5"
          >
            <Avatar>
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback>{contact.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.email}</p>
            </div>
            <div className="flex items-center gap-5">
              <Button variant="ghost">
                <MessageSquareIcon />
                <span>Message</span>
              </Button>
              <Button variant="ghost">
                <PhoneIcon />
                <span>Voice Call</span>
              </Button>
              <Button variant="ghost">
                <CameraIcon />
                <span>Video Call</span>
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
