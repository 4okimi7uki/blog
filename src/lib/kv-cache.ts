import { env } from "node:process";

export const withKVCache = async (
  kv: KVNamespace,
  key: string,
  ttl: number,
  fetcher: () => Promise<string>,
): Promise<{ html: string; hit: boolean }> => {
  if (env.ENVIRONMENT === "production") {
    const cached = await kv.get(key);
    if (cached) return { html: cached, hit: true }; // hit
  }

  // miss
  const fresh = await fetcher();
  await kv.put(key, fresh, { expirationTtl: ttl > 0 ? ttl : undefined });
  return { html: fresh, hit: false };
};
