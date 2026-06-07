import { Hono } from "hono";
import { Layout } from "../components/Layout";
import { withKVCache } from "../lib/kv-cache";
import { AppContext } from "../types";
import { renderToString } from "hono/jsx/dom/server";

const posts = new Hono<AppContext>();

posts.get("/", async (c) => {
  const client = c.get("client");
  const { html, hit } = await withKVCache(c.env.BLOG_CACHE, `post`, 60, async () => {
    const posts = await client.getPosts();
    const contents = posts.contents;
    console.log(posts.contents);
    return renderToString(
      <Layout title={"記事一覧"}>
        {contents.length > 0 ? (
          <ul>
            {contents.map((content) => {
              return (
                <li key={content.id} class="bg-amber-300">
                  <a href={`posts/${content.id}`}>{content.title}</a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>投稿データはありません</p>
        )}
      </Layout>,
    );
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
    return renderToString(
      <Layout title={post?.title}>
        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
      </Layout>,
    );
  });
  c.set("cacheHit", hit);
  return c.html(html);
});

export { posts };
