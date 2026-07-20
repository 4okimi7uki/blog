import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";

import { NotFound } from "./features/error/NotFound";
import { getMicroCMSClient } from "./lib/microcms";
import { about } from "./routes/about";
import { misc } from "./routes/misc";
import { posts } from "./routes/posts";
import { robots } from "./routes/robots";
import { AppContext } from "./types";

const app = new Hono<AppContext>();

app.use("*", async (c, next) => {
  const isPreview = new URL(c.req.url).hostname.endsWith(".workers.dev");
  if (!isPreview) return next();

  const auth = basicAuth({
    username: c.env.BASIC_AUTH_USERNAME,
    password: c.env.BASIC_AUTH_PASSWORD,
  });
  return auth(c, next);
});

app.use("*", async (c, next) => {
  c.set("client", getMicroCMSClient(c.env));
  await next();
  const cacheHit = c.get("cacheHit");
  if (cacheHit !== undefined) {
    c.header("X-Cache", cacheHit ? "HIT" : "MISS");
  }
});

app.route("/", about);
app.route("/posts", posts);
app.route("/misc", misc);
app.route("/robots.txt", robots);

app.notFound((c) => c.html(<NotFound />, 404));

export default app;
