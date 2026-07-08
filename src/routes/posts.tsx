import { Hono } from "hono";
import { renderToString } from "hono/jsx/dom/server";

import { PostDetail } from "../features/posts/PostDetail";
import { PostList } from "../features/posts/PostList";
import { withKVCache } from "../lib/kv-cache";
import { AppContext } from "../types";

const revalidate = 60;

const posts = new Hono<AppContext>();

posts.get("/", async (c) => {
  const client = c.get("client");
  const { html, hit } = await withKVCache(c.env.BLOG_CACHE, `post`, revalidate, async () => {
    const posts = await client.getPosts();
    const contents = posts.contents;
    return renderToString(<PostList posts={contents} />);
  });

  c.set("cacheHit", hit);
  return c.html(html);
});

posts.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const client = c.get("client");

  const post = await client.getPost(slug);
  const { prevPost, nextPost } = await client.getPrevNextPost(post.publishedAt);
  // const html = renderToString(<PostDetail post={post} prevPost={prevPost} nextPost={nextPost} />);

  const { html, hit } = await withKVCache(
    c.env.BLOG_CACHE,
    `post:${slug}`,
    revalidate,
    async () => {
      const post = await client.getPost(slug);
      return renderToString(<PostDetail post={post} prevPost={prevPost} nextPost={nextPost} />);
    },
  );
  c.set("cacheHit", hit);
  return c.html(html);
});

export { posts };
