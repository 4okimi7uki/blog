import { Hono } from "hono";

import { AppContext } from "../types";

const robots = new Hono<AppContext>();

robots.get("/", (c) =>
  c.text(
    `User-agent: *
Allow: /

Sitemap: https://4okimi7uki.com/sitemap.xml
`,
    200,
    {
      "Content-Type": "text/plain; charset=UTF-8",
    },
  ),
);

export { robots };
