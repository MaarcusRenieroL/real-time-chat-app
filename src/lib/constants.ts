import { Chat, MessageList } from "./types";

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

export const MOCK_MESSAGES: MessageList[] = [
  {
    id: "1",
    content: "Hello! How can I assist you today?",
    sender: "other",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    content: "I wanted to discuss the project updates.",
    sender: "user",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    content: "Sure, let me pull up the details.",
    sender: "other",
    timestamp: "10:33 AM",
  },
  {
    id: "4",
    content: "Here's the status report from last week.",
    sender: "other",
    timestamp: "10:34 AM",
  },
  {
    id: "5",
    content: "Thanks! Can we focus on the pending tasks?",
    sender: "user",
    timestamp: "10:35 AM",
  },
  {
    id: "6",
    content: "Absolutely. Task A and Task B are still in progress.",
    sender: "other",
    timestamp: "10:36 AM",
  },
  {
    id: "7",
    content: "What are the blockers for Task A?",
    sender: "user",
    timestamp: "10:37 AM",
  },
  {
    id: "8",
    content:
      "The team is waiting on input from the design department, expected by tomorrow.",
    sender: "other",
    timestamp: "10:38 AM",
  },
  {
    id: "9",
    content: "Got it. How about Task B?",
    sender: "user",
    timestamp: "10:39 AM",
  },
  {
    id: "10",
    content:
      "Task B is delayed due to resource constraints. We've allocated additional support to speed it up.",
    sender: "other",
    timestamp: "10:40 AM",
  },
  {
    id: "11",
    content: "Thanks for the update. Let’s aim to finish these by Friday.",
    sender: "user",
    timestamp: "10:41 AM",
  },
  {
    id: "12",
    content: "Will do. I'll ensure the teams are aligned on the deadline.",
    sender: "other",
    timestamp: "10:42 AM",
  },
  {
    id: "13",
    content: "Great! Let me know if there are any further updates.",
    sender: "user",
    timestamp: "10:43 AM",
  },
  {
    id: "14",
    content: "Sure thing. Have a productive day!",
    sender: "other",
    timestamp: "10:44 AM",
  },
];

export const MOCK_CONTACTS = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/avatars/alice.jpg",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "/avatars/bob.jpg",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    avatar: "/avatars/charlie.jpg",
  },
];
