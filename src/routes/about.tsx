import { Hono } from "hono";

import { About } from "../features/about/About";
import { AppContext } from "../types";

const about = new Hono<AppContext>();

about.get("/", (c) => c.html(<About />));

export { about };
