import { auth } from "~/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      <h1>Chat App</h1>
      {JSON.stringify(session)}
    </div>
  );
}
