import { redisDb } from "../db/redis/db";
import { MessageList } from "../types";

const upstashRedisRestUrl = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL!;
const authToken = process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN!;

type Command =
  | "zrange"
  | "sismember"
  | "get"
  | "smembers"
  | "lrange"
  | "exists"
  | "rpush"
  | "zadd";

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error executing Redis command: ${response.statusText}`);
  }

  const data = await response.json();
  return data.result;
}

export const addMessageToRedis = async (
  chatId: string,
  message: MessageList,
) => {
  await redisDb.zadd(chatId, {
    score: Date.now(),
    member: JSON.stringify(message),
  });
};

export const getMessagesFromRedis = async (chatId: string) => {
  const messages = await fetchRedis("zrange", chatId, 0, -1);
  return messages.map((msg: string) => JSON.parse(msg));
};
