import { Hono } from "hono";

import { Biography } from "../features/about/Biography";
import { AppContext } from "../types";

const about = new Hono<AppContext>();

about.get("/", (c) => c.html(<Biography />));

export { about };
