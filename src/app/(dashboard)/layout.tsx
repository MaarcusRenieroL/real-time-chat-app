import type { ReactNode } from "react";
import { Navbar } from "~/components/dashboard/navigation/navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main className="h-[calc(100vh-5rem)] w-full">{children}</main>
    </div>
  );
}
