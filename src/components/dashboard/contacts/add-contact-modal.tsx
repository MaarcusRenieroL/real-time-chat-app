"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addContactFormSchema } from "~/lib/types/zod-schema";
import { UserPlusIcon } from "lucide-react";
import { trpc } from "~/server/trpc/client";

export const AddContactModal = () => {
  const { mutateAsync: addContacts } =
    trpc.friend.sendFriendRequest.useMutation({
      onSuccess: (data) => {
        toast.success("Success", {
          description: data.message,
        });
      },
      onError: (error) => {
        toast.error("Error", {
          description: error.message,
        });
      },
    });

  const form = useForm<z.infer<typeof addContactFormSchema>>({
    resolver: zodResolver(addContactFormSchema),
    defaultValues: {
      emails: [
        {
          email: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "emails",
  });

  const handleAddContact = async (
    data: z.infer<typeof addContactFormSchema>,
  ) => {
    const validEmails = data.emails.filter((email) => email.email.trim());
    console.log("Sending invites to:", validEmails);

    await addContacts(data);

    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <UserPlusIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Contact</DialogTitle>
          <DialogDescription>
            Enter the email addresses of the contacts you want to add.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddContact)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormLabel>
                <Label>Add via Email</Label>
              </FormLabel>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`emails.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-2">
                            <Input
                              {...field}
                              type="email"
                              placeholder="contact@example.com"
                            />
                            {fields.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() => remove(index)}
                                className="px-2"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="link"
                className="text-sm underline"
                onClick={() => append({ email: "" })}
              >
                + Add another email
              </Button>
            </div>
            <DialogFooter className="gap-5">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Send Invites</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
