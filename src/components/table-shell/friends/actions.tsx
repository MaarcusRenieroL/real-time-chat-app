import { FC, useState } from "react";
import { CircleBackslashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Row } from "../friend-requests";

type Props = {
  rowData: Row;
  data: Row[];
};

export const FriendCellActions: FC<Props> = ({ data, rowData }) => {
  const [allFriends, setAllFriends] = useState(data);
  const router = useRouter();

  const removeFriend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/friends/remove",
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
      console.log(error);
      toast("Error", {
        description: "Something went wrong",
      });
    }
  };

  return (
    <div className="flex items-center justify-between space-x-5">
      <Button size="icon" variant="destructive" onClick={removeFriend}>
        <CircleBackslashIcon />
      </Button>
    </div>
  );
};
