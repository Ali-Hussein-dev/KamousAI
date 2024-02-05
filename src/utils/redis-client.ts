import { Redis } from "@upstash/redis";

// USAGE DATABASE
export const redisClient = Redis.fromEnv();

