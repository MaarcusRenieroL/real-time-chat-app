"use client";

import { useState, type FC } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { addFriendSchema } from "~/lib/types/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "sonner";

export const AddFriendModal: FC = () => {
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof addFriendSchema>>({
    resolver: zodResolver(addFriendSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const handleAddFriendSubmit = async (
    data: z.infer<typeof addFriendSchema>,
  ) => {
    try {
      setIsLoading(true);

      const response = await axios.post("http://localhost:3000/api/friends", {
        data: data,
      });

      if (response.status === 200) {
        toast("Success", {
          description: "Friend request sent",
        });
      }

      setIsLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return;
      }

      if (error instanceof AxiosError) {
        toast("Error", {
          description: error.response?.data,
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Friend</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Firend</DialogTitle>
          <DialogDescription>
            Enter your friend&apos;s email id to add them as your friend
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onClick={form.handleSubmit(handleAddFriendSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your friend&apos;s email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-5 flex items-center justify-end w-full">
              <Button disabled={loading} type="submit">
                Save changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
