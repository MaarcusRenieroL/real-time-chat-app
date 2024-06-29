import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="h-screen w-screen p-10">{children}</div>;
}
