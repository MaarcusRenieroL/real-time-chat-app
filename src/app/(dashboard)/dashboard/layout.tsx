import type { ReactNode } from "react";
import { BottomBar } from "~/components/dashboard/bottom-bar";
import { Sidebar } from "~/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen lg:p-10 p-4">
      <div className="flex lg:h-full h-[calc(100%_-_100px)] w-full gap-5">
        <Sidebar />
        <div className="w-full h-full">{children}</div>
      </div>
      <BottomBar />
    </div>
  );
}
