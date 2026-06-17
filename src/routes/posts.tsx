import { Hono } from "hono";
import { Layout } from "../components/Layout";
import { withKVCache } from "../lib/kv-cache";
import { AppContext } from "../types";
import { renderToString } from "hono/jsx/dom/server";
import dayjs from "dayjs";
import { PostList } from "../features/posts/postList";
import { PostDetail } from "../features/posts/PostDetail";

const revalidate = 60;

const posts = new Hono<AppContext>();

posts.get("/", async (c) => {
  const client = c.get("client");
  const { html, hit } = await withKVCache(c.env.BLOG_CACHE, `post`, revalidate, async () => {
    const posts = await client.getPosts();
    const contents = posts.contents;
    console.log(posts.contents);
    return renderToString(<PostList posts={contents} />);
  });

  c.set("cacheHit", hit);
  return c.html(html);
});

posts.get("/:slug", async (c) => {
  const slug = c.req.param("slug");
  const client = c.get("client");

  const { html, hit } = await withKVCache(c.env.BLOG_CACHE, `post:${slug}`, 60, async () => {
    const post = await client.getPost(slug);
    console.log(post);
    return renderToString(<PostDetail post={post} />);
  });
  c.set("cacheHit", hit);
  return c.html(html);
});

export { posts };
