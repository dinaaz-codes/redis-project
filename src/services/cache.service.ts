import { createClient } from "redis";
import { getConstant } from "../config/constants";

export const DEFAULT_TIME_TO_LIVE = 240;

const redisClient = createClient({ url: getConstant("REDIS_URL") });

redisClient.connect();

redisClient.on("connect", () => {
  console.log("[REDIS] : connected!");
});

redisClient.on("error", (error) => {
  console.log(`[REDIS] : error ${error}`);
});

export const setCache = async (
  key: string,
  value: unknown,
  ttl?: number
): Promise<string> => {
  return redisClient.set(key, JSON.stringify(value), { EX: ttl });
};

export const getCache = async <T>(key: string): Promise<T> => {
  return JSON.parse(await redisClient.get(key)) as T;
};
