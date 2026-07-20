// Extend the auto-generated Env with secrets (not included in wrangler.jsonc vars)
interface Env {
  BASIC_AUTH_USERNAME: string;
  BASIC_AUTH_PASSWORD: string;
  MICROCMS_WEBHOOK_SECRET: string;
}
