import type { FC, ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { TrpcProvider } from "./trpc-provider";
import { AuthProvider } from "./auth-provider";
import { NotificationListener } from "~/context/notification-listener";
import { Chat, User } from "~/lib/types";

type Props = {
  children: ReactNode;
  chats: Chat[];
  friends: User[];
  friendRequests: User[];
};

export const Providers: FC<Props> = ({
  children,
  chats,
  friends,
  friendRequests,
}) => {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TrpcProvider>
            {children}
            <NotificationListener
              chats={chats}
              friends={friends}
              friendRequests={friendRequests}
            />
            <Toaster />
          </TrpcProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};
