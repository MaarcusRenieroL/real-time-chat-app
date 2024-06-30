import type { ReactNode } from "react";
import { Sidebar } from "~/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen p-10">
      <div className="flex h-full w-full gap-5">
        <Sidebar />
        <div className="w-full h-full">{children}</div>
      </div>
    </div>
  );
}
