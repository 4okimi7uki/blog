<div align="center">

# cloudflare-blog

Hono の JSX を Cloudflare Workers で SSR。

**Cloudflare Workers** · **Hono** · **microCMS** · **TailwindCSS v4** · **Workers KV**

</div>

---

## Setup

```bash
pnpm install
```

`.dev.vars` を作成(本番は `wrangler secret put`):

```
MICROCMS_API_KEY=...
BASIC_AUTH_USERNAME=...
BASIC_AUTH_PASSWORD=...
```

## Dev

```bash
pnpm dev:all
```

エディタからはタスク **[WEB] Run app** で自動化(VS Code / Cursor / Zed)。

| Command                         |                                |
| ------------------------------- | ------------------------------ |
| `pnpm dev:all`                  | dev サーバー + Tailwind watch  |
| `pnpm typecheck`                | `tsc --noEmit`                 |
| `pnpm lint:fix` / `pnpm format` | ESLint / Prettier              |
| `pnpm cf-typegen`               | バインディング変更後の型再生成 |
| `pnpm deploy`                   | Cloudflare Workers へデプロイ  |

## Notes

- 全ルート Basic 認証。`/posts` は KV に HTML をキャッシュ
- 構成は routes → features → components の3層(詳細は [CLAUDE.md](CLAUDE.md))
