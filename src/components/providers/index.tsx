import type { FC, ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";

type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </div>
  );
};
