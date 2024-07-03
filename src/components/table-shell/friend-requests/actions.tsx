"use client";

import { FC, useState } from "react";
import { CheckIcon, CircleBackslashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import axios from "axios";
import { Row } from ".";
import { useRouter } from "next/navigation";

type Props = {
  rowData: Row;
  data: Row[];
};

export const FriendRequestCellActions: FC<Props> = ({ data, rowData }) => {
  const [allFriends, setAllFriends] = useState(data);
  const router = useRouter();

  const acceptFriend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/request/accept",
        {
          id: rowData.senderId,
        },
      );

      setAllFriends((prev) =>
        prev.filter((request) => request.senderId !== rowData.senderId),
      );

      toast("Success", {
        description: response.data,
      });

      router.refresh();
    } catch (error) {
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };

  const denyFriend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/request/deny",
        {
          id: rowData.senderId,
        },
      );

      setAllFriends((prev) =>
        prev.filter((request) => request.senderId !== rowData.senderId),
      );

      toast("Success", {
        description: response.data,
      });

      router.refresh();
    } catch (error) {
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="flex items-center justify-between space-x-5">
      <Button size="icon" variant="outline" onClick={acceptFriend}>
        <CheckIcon />
      </Button>
      <Button size="icon" variant="destructive" onClick={denyFriend}>
        <CircleBackslashIcon />
      </Button>
    </div>
  );
};
