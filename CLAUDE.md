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

## Architecture

Cloudflare Workers blog backed by microCMS as a headless CMS. Hono handles routing and renders JSX server-side. HTML responses are cached in Cloudflare KV with a 60-second TTL.

### Request flow

1. **Basic Auth middleware** (`src/index.ts`) — applied globally using `BASIC_AUTH_USERNAME` / `BASIC_AUTH_PASSWORD` secrets.
2. **microCMS client middleware** — injects a typed client into Hono context (`c.get("client")`), created per-request from `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY`.
3. **Route handlers** (`src/routes/posts.tsx`) — call `withKVCache`, which tries `BLOG_CACHE` KV first and falls back to fetching from microCMS. Sets `cacheHit` in context.
4. **X-Cache header** — set in a post-handler middleware based on `cacheHit`.

### Key files

| File | Purpose |
|---|---|
| `src/index.ts` | App entry point, global middleware wiring |
| `src/routes/posts.tsx` | `GET /posts` and `GET /posts/:slug` handlers |
| `src/lib/microcms.ts` | microCMS client factory + `Post` / `PostList` types |
| `src/lib/kv-cache.ts` | KV-backed HTML cache; bypasses cache when `ENVIRONMENT !== "production"` |
| `src/types.ts` | Hono `AppContext` — `Bindings` (= `Env`) and `Variables` (client, cacheHit) |
| `src/env.d.ts` | Manual `Env` extension for secrets not in `wrangler.jsonc` |
| `src/components/Layout.tsx` | Base HTML shell (lang ja, TailwindCSS link) |
| `src/features/posts/` | `PostList` and `PostDetail` JSX components |
| `src/style/global.css` | TailwindCSS source → compiled to `public/style.css` |

### Bindings (wrangler.jsonc)

- `BLOG_CACHE` — KV namespace for HTML caching
- `ASSETS` — Static assets from `./public/`
- `MICROCMS_SERVICE_DOMAIN` — var (non-secret)
- `MICROCMS_API_KEY`, `BASIC_AUTH_USERNAME`, `BASIC_AUTH_PASSWORD` — Cloudflare secrets (not in wrangler.jsonc, declared in `src/env.d.ts`)
