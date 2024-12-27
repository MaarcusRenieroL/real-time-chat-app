import type { FC, ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { TrpcProvider } from "./trpc-provider";
import { AuthProvider } from "./auth-provider";
import { NotificationListener } from "../notification-listener";

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TrpcProvider>
            <NotificationListener />
            {children}
            <Toaster />
          </TrpcProvider>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
};
