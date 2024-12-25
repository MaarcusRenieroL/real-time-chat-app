import type { FC, ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { TrpcProvider } from "./trpc-provider";

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <TrpcProvider>
          {children}
          <Toaster />
        </TrpcProvider>
      </ThemeProvider>
    </div>
  );
};
