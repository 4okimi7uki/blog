# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start wrangler dev server
pnpm dev:css      # Start TailwindCSS watch mode
pnpm dev:all      # Start both wrangler and TailwindCSS concurrently
pnpm build:css    # Build CSS once
pnpm deploy       # Build and deploy to Cloudflare Workers (minified)
pnpm lint         # Run ESLint on src/
pnpm lint:fix     # Run ESLint with auto-fix
pnpm format       # Run Prettier on src/
pnpm typecheck    # Run tsc --noEmit
pnpm cf-typegen   # Regenerate worker-configuration.d.ts from wrangler.jsonc bindings
```

Run `pnpm cf-typegen` after changing bindings or vars in `wrangler.jsonc`.

There are no tests. Lefthook pre-commit hooks (`lefthook.yml`) run `pnpm lint:fix` and Prettier on staged `src/**/*.{ts,tsx}` files and re-stage them.

Local secrets go in `.dev.vars` (gitignored).

## Architecture

Cloudflare Workers blog backed by microCMS as a headless CMS. Hono handles routing and renders JSX server-side (`renderToString`). No client-side JS; styling is TailwindCSS compiled ahead of time.

### Request flow

1. **Basic Auth middleware** (`src/index.ts`) — applied globally using `BASIC_AUTH_USERNAME` / `BASIC_AUTH_PASSWORD` secrets.
2. **microCMS client middleware** — injects a typed client into Hono context (`c.get("client")`), created per-request from `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY`. Its `after` phase sets the `X-Cache` header from `cacheHit`.
3. **Route handlers** — mounted in `src/index.ts`: `/` → about, `/posts` → post list/detail, `/misc` → misc page.

### Routes and caching

- `GET /posts` (`src/routes/posts.tsx`) wraps rendering in `withKVCache` (`src/lib/kv-cache.ts`): serve HTML from the `BLOG_CACHE` KV namespace, or render from microCMS and store with a 60-second TTL. Sets `cacheHit` in context.
- `GET /posts/:slug` currently fetches fresh on every request (its `withKVCache` call is commented out, pending cache-invalidation strategy). It also fetches prev/next posts via `getPrevNextPost`, which filters on `publishedAt`.
- `GET /` and `GET /misc` render static JSX with no CMS call.
- Note: `withKVCache` only *reads* the cache when `env.ENVIRONMENT !== "production"`; it always writes.

### Structure

Pages follow a routes → features → components layering:

- `src/routes/*.tsx` — thin Hono routers; fetch data and call `c.html(...)`.
- `src/features/<page>/` — page-level JSX components (`posts/PostList`, `posts/PostDetail`, `about/About`, `misc/Misc`).
- `src/components/` — shared shell: `Layout` (HTML head with OG/Twitter meta, canonical URL, sidebar + footer), `Logo`, `Navigation` (highlights via `currentPath` prop).
- `src/assets/Icon.tsx` — SVG icon components.

`Layout` hardcodes `SITE_URL` and a default OG image with TODOs — replace when the production domain exists.

### Key files

| File | Purpose |
|---|---|
| `src/index.ts` | App entry point, global middleware wiring, route mounting |
| `src/lib/microcms.ts` | microCMS client factory (endpoint `blogs`) + `Post` / `PostList` types |
| `src/lib/kv-cache.ts` | KV-backed HTML cache helper |
| `src/types.ts` | Hono `AppContext` — `Bindings` (= `Env`) and `Variables` (client, cacheHit) |
| `src/env.d.ts` | Manual `Env` extension for secrets not in `wrangler.jsonc` |
| `src/style/global.css` | TailwindCSS source → compiled to `public/style.css` |

### Bindings (wrangler.jsonc)

- `BLOG_CACHE` — KV namespace for HTML caching
- `ASSETS` — Static assets from `./public/`
- `MICROCMS_SERVICE_DOMAIN` — var (non-secret)
- `MICROCMS_API_KEY`, `BASIC_AUTH_USERNAME`, `BASIC_AUTH_PASSWORD` — Cloudflare secrets (not in wrangler.jsonc, declared in `src/env.d.ts`)
