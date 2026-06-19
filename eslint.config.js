import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import-x";
import unusedImports from "eslint-plugin-unused-imports";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "public/**", "worker-configuration.d.ts"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "import-x": importPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      // 未使用importを自動削除
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
      ],

      // import順の整理
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",      // Node.js組み込み
            "external",     // npm パッケージ
            "internal",     // エイリアスパス
            "parent",       // ../
            "sibling",      // ./
            "index",        // ./index
            "type",         // type imports
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import-x/no-duplicates": "error",

      // TypeScript推奨ルール（軽量）
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "off", // unused-importsプラグインに委譲
    },
  },
  // Prettierとの競合ルールを無効化（必ず最後に置く）
  prettierConfig,
];
