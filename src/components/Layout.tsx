import { Child } from "hono/jsx";

import { Logo } from "./Logo";
import { Navigation } from "./Navigation";

type Props = {
  title: string;
  currentPath: string;
  description?: string;
  ogImage?: string;
  children: Child;
};
const SITE_URL = "https://cloudflare-blog.example.workers.dev"; // TODO: 本番ドメインに差し替え
const DEFAULT_DESCRIPTION = "4okimi7ukiの技術ブログ";
const DEFAULT_OG_IMAGE = `${SITE_URL}/image/default-og.png`; // TODO: 画像を用意

export const Layout = ({ title, currentPath, ogImage, description, children }: Props) => {
  const pageTitle = `${title} - 4okimi7uki`;
  const pageDescription = description ?? DEFAULT_DESCRIPTION;
  const pageOgImage = ogImage ?? DEFAULT_OG_IMAGE;
  const pageUrl = `${SITE_URL}${currentPath}`;
  return (
    <html lang="ja">
      <head>
        <meta charset={"utf-8"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="theme-color" content="#0D1117" />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:site_name" content="4okimi7uki" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageOgImage} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageOgImage} />

        <link rel="icon" href="/favicon.svg" />

        <link rel="stylesheet" href="/style.css" />
      </head>
      <body className="bg-[#0D1117] text-[#9198a1]">
        <div className="max-w-5xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
          <aside className="md:w-50 md:shrink-0 -mx-4 md:mx-0 md:px-0">
            <div className="lg:sticky lg:top-20">
              <Logo />
              <Navigation currentPath={currentPath} />
            </div>
          </aside>
          <main class="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col">
            {children}
            <footer class="md:w-9/12 text-sm flex justify-between items-center mt-20">
              <div>©︎ 2026 Mizuki Aoki.</div>
              <ul className="flex">
                <li>XXX</li>
                <li>XXX</li>
                <li>XXX</li>
              </ul>
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
};
