// src/lib/microcms.ts

import { createClient } from "microcms-js-sdk";

export type Post = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
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
  };
};
