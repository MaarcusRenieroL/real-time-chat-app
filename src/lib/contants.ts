import { Chat } from "./types/index.ts";

export const MOCK_CHATS: Chat[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/avatars/alice.jpg",
    lastMessage: "Hey, how are you doing?",
    unreadCount: 2,
    isActive: true,
  },
];
