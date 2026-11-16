import { Child } from "hono/jsx";

import ANSI_LOGO from "../../assets/ascii-art.txt";
import BANNER_SP from "../../assets/banner-sp.txt";
import BANNER from "../../assets/banner.txt";
import { DonutsIcon } from "../../assets/Icon";
import MY_HISTORY from "../../assets/my-history.txt";
import { Layout } from "../../components/Layout";
import { parseAnsi } from "../../lib/ansi";

// Parsed once per isolate, not per request
const LOGO_SEGMENTS = parseAnsi(ANSI_LOGO.replace(/\n$/, ""));

// Split each `tree` line into its branch prefix and entry name, e.g. "    ├── " / "2016_shibaura-it"
const HISTORY_LINES = MY_HISTORY.trimEnd()
  .split("\n")
  .map((line) => {
    const [, branch = "", name = ""] = line.match(/^([\s│├└─]*)(.*)$/) ?? [];
    return { branch, name };
  });

const TreeEntry = ({ name }: { name: string }) => {
  const [link, target] = name.split(" -> ");
  if (target) {
    return (
      <>
        <span class="text-term-purple">{link}</span>
        <span class="text-term-gray">{" -> "}</span>
        <span class="text-term-cyan font-bold">{target}</span>
      </>
    );
  }
  if (name.endsWith(".md")) return <span>{name}</span>;
  return <span class="text-term-cyan font-bold">{name}</span>;
};

const LAST_LOGIN_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tokyo",
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const USER = "guest";
const HOST = "4okimi7uki.com";
const USER_AT_HOST = `${USER}@${HOST}`;

// macOS style, e.g. "Thu Nov 12 23:18:34"
const formatLastLogin = (date: Date) => {
  const p = Object.fromEntries(
    LAST_LOGIN_FORMAT.formatToParts(date).map(({ type, value }) => [type, value]),
  );
  return `${p.weekday} ${p.month} ${p.day.padStart(2, " ")} ${p.hour}:${p.minute}:${p.second}`;
};

const Command = ({ children }: { children: Child }) => (
  <p>
    <span aria-hidden="true">
      <span class="text-primary-500">{USER_AT_HOST}:~</span>{" "}
      <span class="text-term-cyan">$</span>{" "}
    </span>
    <span class="text-term-white">{children}</span>
  </p>
);

const FASTFETCH: [string, string][] = [
  ["OS", "Human 30.0"],
  ["Kernel", "Curiosity-driven"],
  ["Languages", "TypeScript, Go"],
  ["Frameworks", "React, Next.js, Hono"],
  ["Platforms", "Cloudflare, Vercel"],
  ["Hobbies", "Development, Design, Workout"],
  ["Motto", "Measure twice, run once."],
];

const palette = {
  normal: [
    "#0D1117", // Black
    "#E6B800", // Yellow
    "#E6488F", // Passion Pink
    "#2AA198", // Teal
    "#D97706", // Orange
    "#6786B0", // Blue
    "#8B949E", // Gray
    "#E6EDF3", // White
  ],
  bright: ["#161B22", "#FFD84D", "#FF80B4", "#60C9BD", "#F4A340", "#93B5DC", "#B1BAC4", "#FFFFFF"],
} as const;

export const About = () => {
  return (
    <Layout title="About" currentPath="/">
      <section class="flex flex-col gap-6">
        <header class="flex items-center gap-5">
          <div
            aria-hidden="true"
            class="grid size-14 shrink-0 place-items-center rounded-md border border-white/15 sm:size-16"
          >
            <DonutsIcon width={34} height={34} color="#FF80B4" />
          </div>
          <div class="min-w-0">
            <p aria-hidden="true" class="mb-1 font-term text-xs text-term-gray">
              ~ $ whoami
            </p>
            <h1 class="text-2xl font-medium tracking-tight text-term-white">Mizuki Aoki</h1>
            <p class="mt-0.5 font-term text-xs text-term-gray">
              Software Engineer — Compiled with sugar, built with protein.
              <span class="term-cursor-unfocused"></span>
            </p>
          </div>
        </header>

        <article class="mb-6 text-term-white leading-[1.6] flex flex-col gap-3">
          <p>
            大学では数理科学科で、関数解析を中心に学んでいました。
            <br />
            今はソフトウェアエンジニアとして、主にフロントエンドの開発をしています。
          </p>
          <p>
            何かを作るときは、まず「なぜそうなっているのか」が気になります。設計や実装に筋が通っていて、
            <span class="italic">well-defined</span> なものに出会うと、ちょっと嬉しくなります。
          </p>

          <p>最近はバルクアップにも力を入れています💪</p>
        </article>

        {/** Terminal UI ------ */}
        <article class="terminal rounded-lg border border-white/10 bg-black/30">
          <div class="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span class="size-2.5 rounded-full bg-red-400/70" />
            <span class="size-2.5 rounded-full bg-yellow-400/70" />
            <span class="size-2.5 rounded-full bg-green-400/70" />
            <span class="ml-2 font-mono text-xs text-neutral-500">
              <span class="text-white">{">_"} zsh </span>~
            </span>
          </div>

          <div class="p-4">
            <p>Last login: {formatLastLogin(new Date())} on ttys005</p>
            <pre aria-hidden="true" class="mt-4 mb-5 hidden text-term-gray sm:block">
              {BANNER.trimEnd()}
            </pre>
            <pre aria-hidden="true" class="mt-4 mb-5 text-term-gray sm:hidden">
              {BANNER_SP.trimEnd()}
            </pre>

            <div class="mb-5">
              <Command>fastfetch</Command>
              <div class="flex flex-col gap-5 sm:flex-row">
                <pre aria-hidden="true" class="shrink-0 text-[8px] leading-[1.2]">
                  {LOGO_SEGMENTS.map(({ color, text }) =>
                    color ? <span style={`color:${color}`}>{text}</span> : text,
                  )}
                </pre>
                <div>
                  <ul>
                    <li>
                      <span class="text-primary-500 font-bold">{USER}</span>@
                      <span class="text-primary-500 font-bold">{HOST}</span>
                    </li>
                    <li>{"-".repeat(USER_AT_HOST.length)}</li>
                    {FASTFETCH.map(([category, stack]) => (
                      <li class="grid grid-cols-5 gap-1">
                        <p class="text-term-purple col-span-2">{category}:</p>
                        <p class="col-span-3">{stack}</p>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <div class="flex mt-6">
                      {palette.normal.map((c) => {
                        return <span class="block w-8 h-6" style={{ background: c }}></span>;
                      })}
                    </div>
                    <div class="flex">
                      {palette.bright.map((c) => {
                        return <span class="block w-8 h-6" style={{ background: c }}></span>;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-5">
              <Command>tree -C my_history</Command>
              <pre>
                {HISTORY_LINES.map(({ branch, name }, i) => (
                  <>
                    {i > 0 && "\n"}
                    <span class="text-term-gray">{branch}</span>
                    <TreeEntry name={name} />
                  </>
                ))}
              </pre>
            </div>

            <Command>
              <span class="term-cursor"></span>
            </Command>
          </div>
        </article>
      </section>
    </Layout>
  );
};
