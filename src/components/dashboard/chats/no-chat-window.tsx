import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

export const NoChatWindow: FC = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Chat App</CardTitle>
          <CardDescription>
            Start a new conversation or select an existing chat.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full">
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Start a New Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
