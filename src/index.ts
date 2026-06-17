import { Hono } from "hono";
import { posts } from "./routes/posts";
import { getMicroCMSClient } from "./lib/microcms";
import { AppContext } from "./types";

const app = new Hono<AppContext>();

app.use("*", async (c, next) => {
  c.set("client", getMicroCMSClient(c.env));
  await next();
  const cacheHit = c.get("cacheHit");
  if (cacheHit !== undefined) {
    c.header("X-Cache", cacheHit ? "HIT" : "MISS");
  }
});
app.get("/", (c) => c.redirect("/posts", 301));
app.route("/posts", posts);

export default app;
