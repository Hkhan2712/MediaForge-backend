import redisClient  from "../config/redis-client";
import ENV from "./env";

export async function getBuffer(key: string): Promise<Buffer | null> {
  const b64 = await redisClient.get(key);
  return b64 ? Buffer.from(b64, "base64") : null;
}

export async function setBuffer(key: string, buf: Buffer, ttl = ENV.CACHE_TTL_SECONDS) {
  await redisClient.setEx(key, ttl, buf.toString("base64"));
}