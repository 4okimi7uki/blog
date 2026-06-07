import { getMicroCMSClient } from "./lib/microcms";

export type AppContext = {
  Bindings: Env;
  Variables: {
    client: ReturnType<typeof getMicroCMSClient>;
    cacheHit: boolean;
  };
};
