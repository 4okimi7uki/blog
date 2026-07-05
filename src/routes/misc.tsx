import { Hono } from "hono";

import Misc from "../features/misc/Misc";
import { AppContext } from "../types";

const misc = new Hono<AppContext>();

misc.get("/", (c) => c.html(<Misc />));

export { misc };
