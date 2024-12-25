"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { UserPlus, UserPlusIcon } from "lucide-react";
import { FC, useRef, useState } from "react";

export const AddContactModal: FC = () => {
  const [emails, setEmails] = useState<string[]>([""]);
  const lastInputRef = useRef<HTMLInputElement>(null);

  const addEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSendInvites = () => {
    console.log(
      "Sending invites to:",
      emails.filter((email) => email.trim()),
    );
    setEmails([""]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <UserPlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          lastInputRef.current?.focus();
        }}
      >
        <div className="flex flex-col gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <UserPlus className="opacity-80" size={16} strokeWidth={2} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-left">Add a New Contact</DialogTitle>
            <DialogDescription className="text-left">
              Enter the email address of the contact you want to add.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Add via email</Label>
              <div className="space-y-3">
                {emails.map((email, index) => (
                  <Input
                    key={index}
                    id={`contact-email-${index + 1}`}
                    placeholder="contact@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    ref={index === emails.length - 1 ? lastInputRef : undefined}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={addEmail}
              className="text-sm underline hover:no-underline"
            >
              + Add another email
            </button>
          </div>
          <Button type="button" onClick={handleSendInvites} className="w-full">
            Add Contact(s)
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
