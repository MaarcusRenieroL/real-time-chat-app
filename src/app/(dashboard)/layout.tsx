import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="h-screen w-screen lg:p-10 p-4">{children}</div>;
}
