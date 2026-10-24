import { bindings, defineConfig } from "cf/config";

/**
 * Secret-like files were detected but not read or migrated: .dev.vars. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

export default defineConfig({
	worker: {
		name: "4okimi7uki-cf-page",
		compatibilityDate: "2026-06-07",
		compatibilityFlags: [
			"nodejs_compat",
		],
		entrypoint: "src/index.tsx",
		observability: {
			enabled: true,
		},
		env: {
			MICROCMS_SERVICE_DOMAIN: bindings.text("4okimi7uki-blog"),
			ENVIRONMENT: bindings.text("production"),
			BLOG_CACHE: bindings.kv({
				id: "65eb6fc86f9941bf9df12141c9cc7430",
			}),
			ASSETS: bindings.assets(),
		},
	},
});
