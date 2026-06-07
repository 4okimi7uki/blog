export const withKVCache = async (
  kv: KVNamespace,
  key: string,
  ttl: number,
  fetcher: () => Promise<string>,
): Promise<{ html: string; hit: boolean }> => {
  const cached = await kv.get(key);
  if (cached) return { html: cached, hit: true }; // hit

  // miss
  const fresh = await fetcher();
  await kv.put(key, fresh, { expirationTtl: ttl });
  return { html: fresh, hit: false };
};
