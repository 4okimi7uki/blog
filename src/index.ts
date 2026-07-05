import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";

import { getMicroCMSClient } from "./lib/microcms";
import { about } from "./routes/about";
import { misc } from "./routes/misc";
import { posts } from "./routes/posts";
import { AppContext } from "./types";

const app = new Hono<AppContext>();

app.use("*", async (c, next) => {
  const middleware = basicAuth({
    username: c.env.BASIC_AUTH_USERNAME,
    password: c.env.BASIC_AUTH_PASSWORD,
  });
  return middleware(c as any, next);
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

export default app;
