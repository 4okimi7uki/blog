// src/lib/microcms.ts

import { createClient, MicroCMSImage } from "microcms-js-sdk";

export type Post = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  eyecatch?: MicroCMSImage;
};

export type PostList = {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
};

export const getMicroCMSClient = (env: Env) => {
  const client = createClient({
    serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
    apiKey: env.MICROCMS_API_KEY,
  });

  return {
    getPosts: () => client.getList<Post>({ endpoint: "blogs" }),
    getPost: (id: string) => client.getListDetail<Post>({ endpoint: "blogs", contentId: id }),
    getPrevNextPost: async (publishedAt: string) => {
      const [_prev, _next] = await Promise.all([
        client.getList<Post>({
          endpoint: "blogs",
          queries: {
            filters: `publishedAt[less_than]${publishedAt}`,
            limit: 1,
            orders: "-publishedAt",
          },
        }),
        client.getList<Post>({
          endpoint: "blogs",
          queries: {
            filters: `publishedAt[greater_than]${publishedAt}`,
            limit: 1,
            orders: "publishedAt",
          },
        }),
      ]);

      const toAdjacentPost = (list: typeof _prev) => {
        const item = list.contents[0];
        return item ? { id: item.id, title: item.title } : null;
      };

      return {
        prevPost: toAdjacentPost(_prev),
        nextPost: toAdjacentPost(_next),
      };
    },
  };
};
