"use client";

import { useParams, useRouter } from "next/navigation";
import { ChatWindow } from "~/components/dashboard/chats/chat-window";

export default function ChatPage() {
  const { id } = useParams();
  const router = useRouter();

  if (!id) {
    return <div>No chat selected</div>;
  }

  return <ChatWindow chatId={id.toString()} onBack={() => router.back()} />;
}
